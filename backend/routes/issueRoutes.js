import express from "express";
import { ensureAuthenticatedMiddleware } from "../middleware/authMiddleware.js";
import { deleteController, getcontroller, postcontroller, updateController,getsinglecontroller, getusercontroller } from "../controller/issueController.js";
import multer from "multer";

const router=express.Router()
const upload = multer({ dest: 'uploads/' });

router.get("/get",getcontroller)
router.get("/getsingle",ensureAuthenticatedMiddleware,getsinglecontroller)
router.post("/post",ensureAuthenticatedMiddleware,upload.single('photo'),postcontroller)
router.put("/update",updateController)
router.delete("/delete",deleteController)
router.get("/getuser",ensureAuthenticatedMiddleware,getusercontroller)

export default router