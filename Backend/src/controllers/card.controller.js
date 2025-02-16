import Card from "../models/scratch.model.js";
import User from "../models/user.model.js";
import { asynchandler } from "../utils/Asynchander.js";
import { Apierror } from "../utils/Apierror.js";
import { Apiresponce } from "../utils/Apiresponce.js";

const uploadCard = asynchandler(async (req, res) => {
    const { company, code, validity } = req.body;
    console.log(req.body);

    // Validate input fields
    if (!company || !code || !validity) {
        throw new Apierror(400, 'All fields (company, code, owner, validity) are required.');
    }

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
        owner: req.user?._id,
        validity,

    });

    if (!newCard) {
        throw new Apierror(500, 'Failed to create a new card.');
    }

    // Retrieve newly created card data
    const cardData = await Card.findById(newCard._id);

    return res.status(200).json(new Apiresponce(200, cardData, "Card Successfully Uploaded"));
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

    if (!cardId) {
        throw new Apierror(400, "Card ID is required");
    }


    const card = await Card.findById(cardId);
    if (!card) {
        throw new Apierror(404, "Card does not exist");
    }


    await Card.findByIdAndDelete(cardId);

    const user = await User.findById(req.user?._id);
    if (!user) {
        throw new Apierror(404, "User not found");
    }

    user.cardTaken += 1;
    await user.save();

    console.log("Updated User:", user);

    return res.status(200).json(new Apiresponce(200, {}, "Card Successfully Used"));
});




export { uploadCard, recentCard, companyCard, cardUsed };
