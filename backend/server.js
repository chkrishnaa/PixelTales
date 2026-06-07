import express   from 'express';
import dotenv     from 'dotenv';
import cors       from 'cors';
import morgan     from 'morgan';

import { connectDB }      from './config/db.js';
import feedbackRoutes     from './routes/feedbackRoutes.js';
import reviewRoutes       from './routes/reviewRoutes.js';
import { errorHandler }   from './middlewares/errorHandler.js';

dotenv.config();

const app = express();

// ── Middleware ────────────────────────────────────────────
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:5173',
  credentials: true,
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

if (process.env.NODE_ENV !== 'production') {
  app.use(morgan('dev'));
}

// ── Routes ────────────────────────────────────────────────
app.use('/api/feedback', feedbackRoutes);
app.use('/api/reviews',  reviewRoutes);

// Health check
app.get('/api/health', (_req, res) =>
  res.json({ status: 'ok', timestamp: new Date().toISOString() })
);

// 404 — unmatched routes
app.use((_req, res) =>
  res.status(404).json({ success: false, message: 'Route not found' })
);

// Global error handler (must be last)
app.use(errorHandler);

// ── Start ─────────────────────────────────────────────────
const PORT = process.env.PORT || 5000;

connectDB().then(() => {
  app.listen(PORT, () =>
    console.log(`🚀 Server running on http://localhost:${PORT}`)
  );
});
