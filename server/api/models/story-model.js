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

const StorySchema = new mongoose.Schema(
    {
        image: { type: String },
        title: { type: LangSchema, required: true },
        text: { type: LangSchema, required: true },
        year: { type: String, required: true }
    },
    { timestamps: true }
);

export default mongoose.model("Story", StorySchema);
