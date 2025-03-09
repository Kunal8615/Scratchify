import mongoose from "mongoose";
import CryptoJS from "crypto-js";

 
const cardSchema = new mongoose.Schema({
    company :{
        type:String,
        required:true
    },
     code : {
        type:String,
        required:true
     },
     description : {
      type:String,
      required:true
     },
     owner : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User"
     },
     validity : {
        type:String,
        required:true
     },
     isPublished : {
        type:Boolean,
        default:true,
        required : false
     }
},{timestamps:true})

cardSchema.pre("save", function (next) {
   if (!this.isModified("code")) return next();
   this.code = CryptoJS.AES.encrypt(this.code,process.env.SECRET_KEY).toString();
   next();
});

cardSchema.methods.decryptCode = function () {
   const bytes = CryptoJS.AES.decrypt(this.code,process.env.SECRET_KEY);
   return bytes.toString(CryptoJS.enc.Utf8);
};

const Card = mongoose.model("Card",cardSchema);
export default Card;