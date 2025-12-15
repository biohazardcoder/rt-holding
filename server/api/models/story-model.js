import mongoose from "mongoose";

const StorySchema = new mongoose.Schema({
    image:{type: String},
    title:{type: String,required: true},
    text:{type: String,required: true},
    year:{type:String, required:true}
},{timestamps: true});


export default mongoose.model("Story", StorySchema);