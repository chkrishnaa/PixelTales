import express from "express";

import {
  getNotifications,
  getNotificationById,
  createNotification,
  updateNotification,
  deleteNotification,
  checkAdminNotificationAccess,
} from "../controllers/notificationController.js";

import { protect, adminOnly } from "../middlewares/auth.js";

const router = express.Router();

router.get("/", protect, getNotifications);

router.get("/admin/check", protect, adminOnly, checkAdminNotificationAccess);

router.get("/:id", protect, getNotificationById);

router.post("/", protect, adminOnly, createNotification);

router.put("/:id", protect, adminOnly, updateNotification);

router.delete("/:id", protect, adminOnly, deleteNotification);

export default router;
