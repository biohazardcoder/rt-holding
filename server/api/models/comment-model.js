import mongoose from "mongoose";

const CommentSchema = new mongoose.Schema({
    image:{type: String},
    name:{type: String,required: true},
    text:{type: String},
    job:{type:String}
},{timestamps: true});


export default mongoose.model("Comment", CommentSchema);