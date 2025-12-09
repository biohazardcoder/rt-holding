import express from "express";
import isExisted from "../../middlewares/isExisted.js";
import uploadImage from "../../middlewares/uploadImage.js";
import { AddVideo, createBlog, deleteBlog, DeleteVideo, getAllBlog, updateBlog } from "../controllers/blog-controller.js";
import uploadVideo from "../../middlewares/uploadVideo.js";

const router = express.Router();

router.get("/", getAllBlog);
router.post("/", isExisted, uploadImage, createBlog);
router.put("/:id", isExisted, uploadImage, updateBlog);
router.put("/video/:id", isExisted, uploadVideo, AddVideo);
router.delete("/video/:id", isExisted, DeleteVideo);
router.delete("/:id", isExisted, deleteBlog);

export default router;
