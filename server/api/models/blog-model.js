import mongoose from "mongoose";

const BlogSchema = new mongoose.Schema({
    image:{type: String},
    title:{type: String,required: true},
    text:{type: String,required: true},
    video:{type: String}
},{timestamps: true});


export default mongoose.model("Blog", BlogSchema);