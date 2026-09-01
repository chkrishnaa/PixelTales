import express from "express";
import { getFacebookStats } from "../controllers/facebookController.js";

const router = express.Router();

router.get("/stats", getFacebookStats);

export default router;
