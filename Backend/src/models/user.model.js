import mongoose from "mongoose";
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken"

const UserSchema = new mongoose.Schema({
    name :  {
        type : String,
        required : true,
        index : true
    },
    username : {
        type : String,
        required : true,
        unique : true
    },
    email : {
        type : String,
        lowercase : true,
        required : true,
        unique : true,
        trim: true,
        index : true
    },
    password : {
        type : String,
        required : [true, "Password is required"]
    },
    refreshToken : {
        type : String
    }
},{timestamps : true})

// Pre-save middleware to hash the password before saving the user document

UserSchema.pre("save", async function(next){
    if(!this.isModified("password")) return next();
    try{
        const hashedPassword = await bycrpt.hash(this.password, 10);
        this.password = hashedPassword;
       return next();
    }catch(err){
        return next(err);
    }
})

//COMPARE PASSWORD WITH DATABASE
UserSchema.methods.isPasswordCorrect = async function(password) {
    return await bycrpt.compare(password, this.password);
}

UserSchema.methods.generateAccessToken = async function(){
    const payload  =  {
        _id : this._id,
        email : this.email,
        username : this.username,
        name : this.name
    }
    const token = jwt.sign(payload,process.env.ACCESS_TOKEN_SECRET, {expiresIn : "1d"})
    return token;
}

UserSchema.methods.generateRefreshToken = async function() {
    const payload = {
        _id: this._id
    };
    const token = jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET,{expiresIn : '10d' });
    return token;
};

const User  = mongoose.model('User',UserSchema)
export default User;


