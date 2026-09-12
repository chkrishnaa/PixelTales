import Notification from "../models/Notification.js";

const isActive = (notification) =>
  !notification.expiresAt || notification.expiresAt > new Date();

export const getNotifications = async (req, res, next) => {
  try {
    const notifications = await Notification.find({
      $or: [{ expiresAt: null }, { expiresAt: { $gt: new Date() } }],
    })
      .sort({ createdAt: -1 })
      .lean();

    res.json({
      success: true,
      data: notifications,
    });
  } catch (err) {
    next(err);
  }
};

export const getNotificationById = async (req, res, next) => {
  try {
    const notification = await Notification.findById(req.params.id).lean();

    if (!notification) {
      return res.status(404).json({
        success: false,
        message: "Notification not found.",
      });
    }

    if (req.user.role !== "admin" && !isActive(notification)) {
      return res.status(404).json({
        success: false,
        message: "Notification not found.",
      });
    }

    res.json({
      success: true,
      data: notification,
    });
  } catch (err) {
    next(err);
  }
};

export const createNotification = async (req, res, next) => {
  try {
    const { title, content, expiresAt } = req.body;

    if (!title?.trim() || !content?.trim()) {
      return res.status(400).json({
        success: false,
        message: "Title and content are required.",
      });
    }

    let parsedExpiresAt = null;

    if (expiresAt) {
      parsedExpiresAt = new Date(expiresAt);

      if (Number.isNaN(parsedExpiresAt.getTime())) {
        return res.status(400).json({
          success: false,
          message: "Invalid expiry date.",
        });
      }

      if (parsedExpiresAt <= new Date()) {
        return res.status(400).json({
          success: false,
          message: "Expiry date must be in the future.",
        });
      }
    }

    const notification = await Notification.create({
      title: title.trim(),
      content,
      expiresAt: parsedExpiresAt,
      createdBy: req.user._id,
    });

    res.status(201).json({
      success: true,
      message: "Notification posted successfully.",
      data: notification,
    });
  } catch (err) {
    next(err);
  }
};

export const updateNotification = async (req, res, next) => {
  try {
    const { title, content, expiresAt } = req.body;

    if (!title?.trim() || !content?.trim()) {
      return res.status(400).json({
        success: false,
        message: "Title and content are required.",
      });
    }

    let parsedExpiresAt = null;

    if (expiresAt) {
      parsedExpiresAt = new Date(expiresAt);

      if (Number.isNaN(parsedExpiresAt.getTime())) {
        return res.status(400).json({
          success: false,
          message: "Invalid expiry date.",
        });
      }

      if (parsedExpiresAt <= new Date()) {
        return res.status(400).json({
          success: false,
          message: "Expiry date must be in the future.",
        });
      }
    }

    const notification = await Notification.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          title: title.trim(),
          content,
          expiresAt: parsedExpiresAt,
        },
      },
      {
        returnDocument: "after",
        runValidators: true,
      },
    );

    if (!notification) {
      return res.status(404).json({
        success: false,
        message: "Notification not found.",
      });
    }

    res.json({
      success: true,
      message: "Notification updated successfully.",
      data: notification,
    });
  } catch (err) {
    next(err);
  }
};

export const deleteNotification = async (req, res, next) => {
  try {
    const notification = await Notification.findByIdAndDelete(req.params.id);

    if (!notification) {
      return res.status(404).json({
        success: false,
        message: "Notification not found.",
      });
    }

    res.json({
      success: true,
      message: "Notification deleted successfully.",
    });
  } catch (err) {
    next(err);
  }
};

export const checkAdminNotificationAccess = async (req, res) => {
  res.json({
    success: true,
    isAdmin: true,
  });
};
