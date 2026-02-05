import mongoose from "mongoose";

const LangSchema = new mongoose.Schema(
    {
        en: { type: String, required: true },
        uz: { type: String, required: true },
        ru: { type: String, required: true },
        kr: { type: String, required: true },
    },
    { _id: false }
);

const CommentSchema = new mongoose.Schema(
    {
        image: { type: String },
        name: { type: LangSchema, required: true },
        text: { type: LangSchema },
        job: { type: LangSchema }
    },
    { timestamps: true }
);

export default mongoose.model("Comment", CommentSchema);
