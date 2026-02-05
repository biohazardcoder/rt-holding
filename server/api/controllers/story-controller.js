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
            title: {
                en: req.body.title.en,
                uz: req.body.title.uz,
                ru: req.body.title.ru,
                kr: req.body.title.kr,
            },
            text: {
                en: req.body.text.en,
                uz: req.body.text.uz,
                ru: req.body.text.ru,
                kr: req.body.text.kr,
            },
            year: req.body.year,
        });

        await story.save();
        res.status(201).json(story);
    } catch (error) {
        res.status(400).json({ message: "Problem creating story" });
    }
};


export const updateStory = async (req, res) => {
    try {
        const story = await Story.findById(req.params.id);
        if (!story) {
            return res.status(404).json({ message: "Story not found" });
        }

        let updatedData = {};

        if (req.body.title) {
            updatedData.title = {
                ...story.title,
                ...req.body.title,
            };
        }

        if (req.body.text) {
            updatedData.text = {
                ...story.text,
                ...req.body.text,
            };
        }

        if (req.body.year) {
            updatedData.year = req.body.year;
        }

        if (req.uploadedImages?.[0]) {
            if (story.image) {
                const fileName = getFileNameFromUrl(story.image);
                const oldImagePath = path.join(IMAGES_DIR, fileName);

                try {
                    await fs.unlink(oldImagePath);
                } catch (err) {
                    console.error("Error deleting old image:", err.message);
                }
            }
            updatedData.image = req.uploadedImages[0];
        }

        const updatedStory = await Story.findByIdAndUpdate(
            req.params.id,
            updatedData,
            { new: true }
        );

        res.status(200).json(updatedStory);
    } catch (error) {
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