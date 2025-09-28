import express from "express";
import { ensureAuthenticatedMiddleware } from "../middleware/authMiddleware.js";
import { addRating, getRating } from "../controller/rateController.js";
const router=express.Router()

router.post("/add",ensureAuthenticatedMiddleware,addRating)
router.get("/get/",ensureAuthenticatedMiddleware,getRating)

export default router;