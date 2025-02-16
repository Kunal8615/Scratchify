import { asynchandler } from "../utils/Asynchander.js";
import { Apierror } from "../utils/Apierror.js";
import { Apiresponce } from "../utils/Apiresponce.js";
import User from "../models/user.model.js"


const GenerateAccessAndRefreshTokens = async (userId) => {
    try {
        const user = await User.findById(userId);
        const accessToken = await user.generateAccessToken();
        const refreshToken = await user.generateRefreshToken();

        // Save refresh token in database
        user.refreshToken = refreshToken;
        await user.save({ validateBeforeSave: false });
        
        return { accessToken, refreshToken };
    } catch (error) {
        throw new Apierror(500, "something went wrong while generating tokens");

    }
}

const RegisterUser = asynchandler(async (req, res) => {
    
    console.log(req.body);
        const { name, username, email, password } =  req.body;
        if ([name, username, email, password].some(field => !field || field.trim() === "")) {
       throw new Apierror(400,"all feild are requied");
        }

        const existuser = await User.findOne({
            $or: [{ username }, { email }]
        });

        // Check if user already exists
        if (existuser) {
            throw new Apierror(409, "User already exists");
        }

        //create user

        const user = await User.create({
            name,
            username,
            email,
            password
        })

        const createduser = await User.findById(user._id).select("-password -refreshToken");

        if (!createduser) {
            throw new Apierror(500, "Error while registering user");
        }
        return res.status(201).json(new Apiresponce(200, createduser, "User registered successfully"));

    
})

const loginUser = asynchandler(async (req, res) => {
    const { email, username, password } = req.body; 
    if (!username && !email) {
        throw new Apierror(400, "Username or email is required");

    }
    const user = await User.findOne({
        $or: [{ username }, { email }]
    });

    if (!user) {
        throw new Apierror(404, "User does not exist");
    }

    const isPasswordValid = await user.isPasswordCorrect(password);
    if (!isPasswordValid) {
        throw new Apierror(401, "Invalid user credentials");
    }

    const { accessToken, refreshToken } = await GenerateAccessAndRefreshTokens(user._id);

    const loggedinUser = await User.findById(user._id).select("-password -refreshToken");

    const options = {
        httpOnly: true,
        sameSite: "None",
        secure: "true",
        expires: new Date(Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000)
    };
    console.log(loggedinUser, "login done");

    return res
        .status(200)
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", refreshToken, options)
        .json(new Apiresponce(200, { user: loggedinUser, accessToken, refreshToken },
            "User logged in successfully"));
})

const getUser = asynchandler(async (req, res) => {
    try {
    console.log(req.user)
        const user = await User.findById(req.user?._id);
        if (!user) {
            throw new Apierror(404, "User not found");
        }

        return res.status(200).json(new Apiresponce(200, user, "User's data fetched"));
    } catch (error) {
        res.status(500).json(new Apiresponce(500,{}, error.message));
    }
});

export {RegisterUser,loginUser,getUser};