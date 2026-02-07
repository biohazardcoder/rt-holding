import express from "express";
import { isExisted } from "../../middlewares/isExisted.js";
import uploadImage from "../../middlewares/uploadImage.js";
import { getAllStory, createStory, deleteStory, updateStory } from "../controllers/story-controller.js";

const router = express.Router();

router.get("/", getAllStory);
router.post("/", isExisted, uploadImage, createStory);
router.put("/:id", isExisted, uploadImage, updateStory);
router.delete("/:id", isExisted, deleteStory);

export default router;
