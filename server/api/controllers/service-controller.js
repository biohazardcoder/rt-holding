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
            image: req.uploadedImages?.[0] || "",
            title:
                typeof req.body.title === "string" ? JSON.parse(req.body.title) : req.body.title,
            text:
                typeof req.body.text === "string" ? JSON.parse(req.body.text) : req.body.text,
        });

        await service.save();
        res.status(201).json(service);
    } catch (error) {
        console.error(error);
        res.status(400).json({ message: "Problem creating service" });
    }
};


export const updateService = async (req, res) => {
    try {
        const service = await Service.findById(req.params.id);
        if (!service) return res.status(404).json({ message: "Service not found" });

        const updatedData = {};

        if (req.body.title) {
            updatedData.title =
                typeof req.body.title === "string" ? JSON.parse(req.body.title) : req.body.title;
        }
        if (req.body.text) {
            updatedData.text =
                typeof req.body.text === "string" ? JSON.parse(req.body.text) : req.body.text;
        }

        if (req.uploadedImages?.length) {
            if (service.image) {
                const fileName = getFileNameFromUrl(service.image);
                const oldImagePath = path.join(IMAGES_DIR, fileName);
                try { await fs.unlink(oldImagePath); } catch { }
            }
            updatedData.image = req.uploadedImages[0];
        }

        const updatedService = await Service.findByIdAndUpdate(
            req.params.id,
            { $set: updatedData },
            { new: true }
        );

        res.status(200).json(updatedService);
    } catch (error) {
        console.log(error);
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
        res.status(200).json({ message: "Service deleted" });
    } catch (error) {
        res.status(400).json({ message: "Problem deleting service" });
    }
};