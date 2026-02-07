import fs from "fs/promises";
import path from "path";
import Comment from "../models/comment-model.js";

const IMAGES_DIR = path.resolve("uploads/images");

function getFileNameFromUrl(url) {
    return url.split("/").pop();
}

export const getAllComments = async (_, res) => {
    try {
        const comments = await Comment.find();
        res.status(200).json(comments);
    } catch (error) {
        res.status(500).json({ message: "Problem getting comments" });
    }
};

export const createComment = async (req, res) => {
    try {
        const comment = new Comment({
            image: req.uploadedImages?.[0] || "",

            name:
                typeof req.body.name === "string"
                    ? JSON.parse(req.body.name)
                    : req.body.name,

            text:
                req.body.text
                    ? typeof req.body.text === "string"
                        ? JSON.parse(req.body.text)
                        : req.body.text
                    : undefined,

            job:
                req.body.job
                    ? typeof req.body.job === "string"
                        ? JSON.parse(req.body.job)
                        : req.body.job
                    : undefined,
        });

        await comment.save();
        res.status(201).json(comment);
    } catch (error) {
        console.log(error);
        res.status(400).json({ message: "Problem creating comment" });
    }
};



export const updateComment = async (req, res) => {
    try {
        const comment = await Comment.findById(req.params.id);
        if (!comment) return res.status(404).json({ message: "Comment not found" });

        const updatedData = {};
        console.log(req.uploadedImages[0]);
        ["name", "text", "job"].forEach((field) => {
            if (req.body[field]) {
                try {
                    updatedData[field] =
                        typeof req.body[field] === "string"
                            ? JSON.parse(req.body[field])
                            : req.body[field];
                } catch (err) {
                    return res.status(400).json({ message: `Invalid JSON in ${field}` });
                }
            }
        });

        if (req.uploadedImages?.length) {
            if (comment.image) {
                const oldFile = getFileNameFromUrl(comment.image);
                const oldPath = path.join(IMAGES_DIR, oldFile);
                try {
                    await fs.promises.unlink(oldPath);
                } catch { }
            }
            updatedData.image = req.uploadedImages[0];
        }

        const updatedComment = await Comment.findByIdAndUpdate(
            req.params.id,
            { $set: updatedData },
            { new: true }
        );

        res.status(200).json(updatedComment);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Problem updating comment" });
    }
};



export const deleteComment = async (req, res) => {
    try {
        const comment = await Comment.findByIdAndDelete(req.params.id);
        if (!comment) {
            return res.status(404).json({ message: "Comment not found" });
        }

        if (comment.image) {
            const fileName = getFileNameFromUrl(comment.image);
            const imagePath = path.join(IMAGES_DIR, fileName);

            try {
                await fs.unlink(imagePath);
            } catch (err) {
                console.error("Error deleting image file:", err.message);
            }
        }

        res.status(200).json({ message: "Comment deleted" });
    } catch (error) {
        res.status(400).json({ message: "Problem deleting comment" });
    }
};
