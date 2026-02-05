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
            name: {
                en: req.body.name.en,
                uz: req.body.name.uz,
                ru: req.body.name.ru,
                kr: req.body.name.kr,
            },
            text: req.body.text
                ? {
                    en: req.body.text.en,
                    uz: req.body.text.uz,
                    ru: req.body.text.ru,
                    kr: req.body.text.kr,
                }
                : undefined,
            job: req.body.job
                ? {
                    en: req.body.job.en,
                    uz: req.body.job.uz,
                    ru: req.body.job.ru,
                    kr: req.body.job.kr,
                }
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
        if (!comment) {
            return res.status(404).json({ message: "Comment not found" });
        }

        let updatedData = {};

        if (req.body.name) {
            updatedData.name = {
                ...comment.name,
                ...req.body.name,
            };
        }

        if (req.body.text) {
            updatedData.text = {
                ...comment.text,
                ...req.body.text,
            };
        }

        if (req.body.job) {
            updatedData.job = {
                ...comment.job,
                ...req.body.job,
            };
        }

        if (req.uploadedImages?.[0]) {
            if (comment.image) {
                const fileName = getFileNameFromUrl(comment.image);
                const oldImagePath = path.join(IMAGES_DIR, fileName);
                try {
                    await fs.unlink(oldImagePath);
                } catch (err) {
                    console.error("Error deleting old image:", err.message);
                }
            }
            updatedData.image = req.uploadedImages[0];
        }

        const updatedComment = await Comment.findByIdAndUpdate(
            req.params.id,
            updatedData,
            { new: true }
        );

        res.status(200).json(updatedComment);
    } catch (error) {
        res.status(400).json({ message: "Problem updating comment" });
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
