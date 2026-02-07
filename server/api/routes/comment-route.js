import express from "express";
import { isExisted } from "../../middlewares/isExisted.js";
import uploadImage from "../../middlewares/uploadImage.js";
import { createComment, deleteComment, getAllComments, updateComment } from "../controllers/comment-controller.js";

const router = express.Router();

router.get("/", getAllComments);
router.post("/", isExisted, uploadImage, createComment);
router.put("/:id", isExisted, uploadImage, updateComment);
router.delete("/:id", isExisted, deleteComment);

export default router;
