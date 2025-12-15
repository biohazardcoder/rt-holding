import mongoose from "mongoose";

const ServiceSchema = new mongoose.Schema({
    image:{type: String},
    title:{type: String,required: true},
    text:{type: String,required: true},
},{timestamps: true});


export default mongoose.model("Service", ServiceSchema);