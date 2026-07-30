import 'dotenv/config';
import express      from 'express';
import cors          from 'cors';
import cookieParser  from 'cookie-parser';
import passport      from 'passport';

import { connectDB }       from './config/db.js';
import configurePassport   from './config/passport.js';
import authRoutes          from './routes/authRoutes.js';
import feedbackRoutes      from './routes/feedbackRoutes.js';
import reviewRoutes        from './routes/reviewRoutes.js';
import chatRoutes          from './routes/chatRoutes.js';
import movieRoutes         from './routes/movieRoutes.js';
import collectionRoutes    from './routes/collectionRoutes.js';
import analyticsRoutes from './routes/analyticsRoutes.js';
import watchRoutes     from './routes/watchRoutes.js';

import { errorHandler }    from './middlewares/errorHandler.js';

const app = express();

// ── Passport strategies ───────────────────────────────────
configurePassport();
app.use(passport.initialize());

// ── Middleware ────────────────────────────────────────────
const allowedOrigins = (process.env.CLIENT_URL || "")
  .split(",")
  .map((url) => url.trim())
  .filter(Boolean);

const corsOptions = {
  origin(origin, cb) {
    if (!origin) return cb(null, true);

    if (/^https?:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/.test(origin)) {
      return cb(null, true);
    }

    if (allowedOrigins.includes(origin)) {
      return cb(null, true);
    }

    return cb(new Error(`Origin ${origin} not allowed by CORS`));
  },

  credentials: true,
};

app.use(cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());



// ── Routes ────────────────────────────────────────────────
app.use("/api/auth", authRoutes);
app.use("/api/feedback", feedbackRoutes);
app.use("/api/reviews", reviewRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/movies", movieRoutes);
app.use("/api/collections", collectionRoutes);
app.use("/api/analytics", analyticsRoutes);
app.use("/api/watch",     watchRoutes);


// Health check
app.get('/api/health', (_req, res) =>
  res.json({ status: 'ok', timestamp: new Date().toISOString() })
);

// 404
app.use((_req, res) =>
  res.status(404).json({ success: false, message: 'Route not found' })
);

// Global error handler (must be last)
app.use(errorHandler);

connectDB().then(() => {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
  });
});
