import Service from '../models/service-model.js';
import fs from "fs/promises";
import path from "path";

const IMAGES_DIR = path.resolve("uploads/images");

function getFileNameFromUrl(url) {
    return url.split("/").pop();
}

export const getAllService = async (_, res) => {
    try {
        const services = await Service.find();
        res.status(200).json(services);
    } catch (error) {
        res.status(500).json({ message: "Problem getting services" });
    }
};

export const createService = async (req, res) => {
    try {
        const service = new Service({
            image: req.uploadedImages[0] || "", 
            title: req.body.title,
            text: req.body.text,
        });
        await service.save();
        res.status(201).json(service);
    } catch (error) {
        res.status(400).json({ message: "Problem creating service" });
    }
};

export const updateService = async (req, res) => {
    try {
        const service = await Service.findById(req.params.id);
        if (!service) {
            return res.status(404).json({ message: "Service not found" });
        }

        let updatedData = req.body;

        if (req.uploadedImages && req.uploadedImages[0]) {
            if (service.image) {
                const fileName = getFileNameFromUrl(service.image);
                const oldImagePath = path.join(IMAGES_DIR, fileName);

                try {
                    await fs.unlink(oldImagePath);
                } catch (err) {
                    console.error("Error deleting old image:", err.message);
                }
            }
            updatedData.image = req.uploadedImages[0];
        }

        const updatedService = await Service.findByIdAndUpdate(
            req.params.id,
            updatedData,
            { new: true }
        );

        res.status(200).json(updatedService);
    } catch (error) {
        res.status(400).json({ message: "Problem updating service" });
    }
};

export const deleteService = async (req, res) => {
    try {
        const service = await Service.findByIdAndDelete(req.params.id);
        if (!service) {
            return res.status(404).json({ message: "Service not found" });
        }

        if (service.image) {
            const fileName = getFileNameFromUrl(service.image);
            const imagePath = path.join(IMAGES_DIR, fileName);

            try {
                await fs.unlink(imagePath);
            } catch (err) {
                console.error("Error deleting image file:", err.message);
            }
        }

        if (service.video) {
            const fileName = getFileNameFromUrl(service.video);
            const videoPath = path.join(VIDEOS_DIR, fileName);

            try {
                await fs.unlink(videoPath);
            } catch (err) {
                console.error("Error deleting video file:", err.message);
            }
        }

        res.status(200).json({ message: "Service deleted" });
    } catch (error) {
        res.status(400).json({ message: "Problem deleting service" });
    }
};