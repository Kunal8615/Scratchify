import Card from "../models/scratch.model.js";
import User from "../models/user.model.js";
import { asynchandler } from "../utils/Asynchander.js";
import { Apierror } from "../utils/Apierror.js";
import { Apiresponce } from "../utils/Apiresponce.js";

const uploadCard = asynchandler(async (req, res) => {
    const { company, code, validity ,description} = req.body;
    console.log(req.body);

    // Validate input fields
    if (!company || !code || !validity ||!description) {
        throw new Apierror(400, 'All fields (company, code, owner, validity) are required.');
    }

    const user = await User.findById(req.user?._id);

    // Check if card already exists
    const existCard = await Card.findOne({ code: code, owner: req.user?._id });

    if (existCard) {
        throw new Apierror(409, 'Card already exists.');
    }
    if (!req.user?._id) {
        throw new Apierror(401, "Unauthorized: User not logged in.");
    }
    // Create new card (isPublished will be true by default)
    const newCard = await Card.create({
        company,
        code,
        description,
        owner: req.user?._id,
        validity,

    });
    //update user
    user.totalUpload += 1;
    user.remainingToAvail = user.totalUpload - user.cardTaken;
    await user.save();

    if (!newCard) {
        throw new Apierror(500, 'Failed to create a new card.');
    }

    // Retrieve newly created card data
    const cardData = await Card.findById(newCard._id);

    return res.status(200).json(new Apiresponce(200, { cardData, user }, "Card Successfully Uploaded"));
});

const recentCard = asynchandler(async (req, res) => {
    const topThereCard = await Card.aggregate([
        {
            $match: {
                isPublished: true
            },
        },
        {
            $sort: {
                createdAt: -1
            }
        },
        {
            $limit: 3
        }
    ]);
    return res.status(200).json(new Apiresponce(200, topThereCard, "Top 3 Recently Uploaded Cards"));
})

const companyCard = asynchandler(async (req, res) => {
    const { companyName } = req.params;
    if (!companyName) {
        throw new Apierror(400, "Company name is required");
    }
    const companyCards = await Card.find({
        company: companyName,
        isPublished: true
    });

    return res.status(200).json(new Apiresponce(200, companyCards, `Cards Uploaded by ${companyName}`));
})

const cardUsed = asynchandler(async (req, res) => {
    const { cardId } = req.params;

    const user = await User.findById(req.user?._id);

    if (user.remainingToAvail == 0) {
        throw new Apierror(403, "No more cards available to take");
    }
    if (!cardId) {
        throw new Apierror(400, "Card ID is required");
    }


    const card = await Card.findById(cardId);
    if (!card) {
        throw new Apierror(404, "Card does not exist");
    }


    await Card.findByIdAndDelete(cardId);


    if (!user) {
        throw new Apierror(404, "User not found");
    }

    user.cardTaken += 1;
    await user.save();

    //remove cardcount from avaible
    user.remainingToAvail = user.totalUpload - user.cardTaken;
    await user.save();

    console.log("Updated User:", user);

    return res.status(200).json(new Apiresponce(200, user, "Card Successfully Used"));
});


const decryptCode = asynchandler(async (req, res) => {
    const { cardId } = req.params;
    if (!cardId) {
        throw new Apierror(400, "Card Code is required");
    }
    const card = await Card.findById(cardId);
    if (!card) {
        throw new Apierror(404, "Card does not exist");
    }

    res.status(200).json({
        _id: card._id,
        company: card.company,
        description : card.description,
        code: card.decryptCode(),
        owner: card.owner,
        validity: card.validity,
        isPublished: card.isPublished
    });


})

const searchCard = asynchandler(async (req, res) => {
    try {
        const { searchQuery } = req.query;

        // ✅ Search query validation
        if (!searchQuery) {
            throw new Apierror(400, "Search query is required");
        }

        const data = await Card.aggregate([
            {
                $match: {
                    description: { $regex: searchQuery, $options: 'i' }
                }
            },
            {
                $limit: 3   
            },
           
        ]);

        console.log(data);

        // ✅ Empty data handling
        if (!data || data.length === 0) {
            throw new Apierror(404, "No matching data found.");
        }

        // ✅ Successful response
        return res.status(200).json(new Apiresponce(200, data, "Data fetched successfully"));
        
    } catch (error) {
        return res.status(error.statusCode || 500).json(
            new Apiresponce(error.statusCode || 500, null, error.message || "Error occurred in SearchData")
        );
    }
});



export { uploadCard, recentCard, companyCard, cardUsed, decryptCode ,searchCard};
