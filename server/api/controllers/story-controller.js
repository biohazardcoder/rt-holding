import Story from '../models/story-model.js';
import fs from "fs/promises";
import path from "path";

const IMAGES_DIR = path.resolve("uploads/images");

function getFileNameFromUrl(url) {
    return url.split("/").pop();
}

export const getAllStory = async (_, res) => {
    try {
        const stories = await Story.find();
        res.status(200).json(stories);
    } catch (error) {
        res.status(500).json({ message: "Problem getting stories" });
    }
};

export const createStory = async (req, res) => {
    try {
        const story = new Story({
            image: req.uploadedImages?.[0] || "",
            title:
                typeof req.body.title === "string"
                    ? JSON.parse(req.body.title)
                    : req.body.title,
            text:
                typeof req.body.text === "string"
                    ? JSON.parse(req.body.text)
                    : req.body.text,
            year: req.body.year,
        });

        await story.save();
        res.status(201).json(story);
    } catch (error) {
        console.error(error);
        res.status(400).json({ message: "Problem creating story" });
    }
};


export const updateStory = async (req, res) => {
    try {
        const story = await Story.findById(req.params.id);
        if (!story) {
            return res.status(404).json({ message: "Story not found" });
        }

        const updatedData = {};

        if (req.body.title) {
            updatedData.title =
                typeof req.body.title === "string"
                    ? JSON.parse(req.body.title)
                    : req.body.title;
        }

        if (req.body.text) {
            updatedData.text =
                typeof req.body.text === "string"
                    ? JSON.parse(req.body.text)
                    : req.body.text;
        }

        if (req.body.year) {
            updatedData.year = req.body.year;
        }

        if (req.uploadedImages?.length) {
            if (story.image) {
                const fileName = getFileNameFromUrl(story.image);
                const oldImagePath = path.join(IMAGES_DIR, fileName);
                try {
                    await fs.unlink(oldImagePath);
                } catch { }
            }
            updatedData.image = req.uploadedImages[0];
        }

        const updatedStory = await Story.findByIdAndUpdate(
            req.params.id,
            { $set: updatedData },
            { new: true }
        );

        res.status(200).json(updatedStory);
    } catch (error) {
        console.log(error);
        res.status(400).json({ message: "Problem updating story" });
    }
};



export const deleteStory = async (req, res) => {
    try {
        const story = await Story.findByIdAndDelete(req.params.id);
        if (!story) {
            return res.status(404).json({ message: "Story not found" });
        }

        if (story.image) {
            const fileName = getFileNameFromUrl(story.image);
            const imagePath = path.join(IMAGES_DIR, fileName);

            try {
                await fs.unlink(imagePath);
            } catch (err) {
                console.error("Error deleting image file:", err.message);
            }
        }

        res.status(200).json({ message: "Story deleted" });
    } catch (error) {
        res.status(400).json({ message: "Problem deleting story" });
    }
};