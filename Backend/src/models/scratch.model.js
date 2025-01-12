import mongoose from "mongoose";
 
const cardSchema = new mongoose.Schema({
    company :{
        type:String,
        required:true
    },
     code : {
        type:String,
        required:true
     },
     owner : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User"
     },
     validity : {
        type:Date,
        required:true
     },
     isPublished : {
        type:Boolean,
        default:true
     }
},{timestamps:true})

const Card = mongoose.model("Card",cardSchema);
export default Card;