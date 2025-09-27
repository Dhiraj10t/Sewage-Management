import express from "express";
import { ensureAuthenticatedMiddleware } from "../middleware/authMiddleware.js";
import { deleteController, getcontroller, postcontroller, updateController } from "../controller/issueController.js";

const router=express.Router()

router.get("/get",getcontroller)
router.post("/post",ensureAuthenticatedMiddleware,postcontroller)
router.put("/update",updateController)
router.delete("/delete",deleteController)

export default router