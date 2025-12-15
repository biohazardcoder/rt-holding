import Blog from '../models/blog-model.js';
import fs from "fs/promises";
import path from "path";

const IMAGES_DIR = path.resolve("uploads/images");

function getFileNameFromUrl(url) {
    return url.split("/").pop();
}

export const getAllBlog = async (_, res) => {
    try {
        const blogs = await Blog.find();
        res.status(200).json(blogs);
    } catch (error) {
        res.status(500).json({ message: "Problem getting blogs" });
    }
};

export const createBlog = async (req, res) => {
    try {
        const blog = new Blog({
            image: req.uploadedImages[0] || "", 
            title: req.body.title,
            text: req.body.text,
        });
        await blog.save();
        res.status(201).json(blog);
    } catch (error) {
        res.status(400).json({ message: "Problem creating blog" });
    }
};

export const updateBlog = async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id);
        if (!blog) {
            return res.status(404).json({ message: "Blog not found" });
        }

        let updatedData = req.body;

        if (req.uploadedImages && req.uploadedImages[0]) {
            if (blog.image) {
                const fileName = getFileNameFromUrl(blog.image);
                const oldImagePath = path.join(IMAGES_DIR, fileName);

                try {
                    await fs.unlink(oldImagePath);
                } catch (err) {
                    console.error("Error deleting old image:", err.message);
                }
            }
            updatedData.image = req.uploadedImages[0];
        }

        const updatedBlog = await Blog.findByIdAndUpdate(
            req.params.id,
            updatedData,
            { new: true }
        );

        res.status(200).json(updatedBlog);
    } catch (error) {
        res.status(400).json({ message: "Problem updating blog" });
    }
};

export const deleteBlog = async (req, res) => {
    try {
        const blog = await Blog.findByIdAndDelete(req.params.id);
        if (!blog) {
            return res.status(404).json({ message: "Blog not found" });
        }

        if (blog.image) {
            const fileName = getFileNameFromUrl(blog.image);
            const imagePath = path.join(IMAGES_DIR, fileName);

            try {
                await fs.unlink(imagePath);
            } catch (err) {
                console.error("Error deleting image file:", err.message);
            }
        }

        res.status(200).json({ message: "Blog deleted" });
    } catch (error) {
        res.status(400).json({ message: "Problem deleting blog" });
    }
};