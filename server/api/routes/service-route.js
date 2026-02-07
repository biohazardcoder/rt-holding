import express from "express";
import { isExisted } from "../../middlewares/isExisted.js";
import uploadImage from "../../middlewares/uploadImage.js";
import { createService, deleteService, getAllService, updateService } from "../controllers/service-controller.js";

const router = express.Router();

router.get("/", getAllService);
router.post("/", isExisted, uploadImage, createService);
router.put("/:id", isExisted, uploadImage, updateService);
router.delete("/:id", isExisted, deleteService);

export default router;
