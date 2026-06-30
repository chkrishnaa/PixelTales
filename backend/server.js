import 'dotenv/config';
import http from "http";
import express      from 'express';
import cors          from 'cors';
import morgan        from 'morgan';
import cookieParser  from 'cookie-parser';
import passport      from 'passport';
import { Server } from "socket.io";

import { connectDB }       from './config/db.js';
import configurePassport   from './config/passport.js';
import authRoutes          from './routes/authRoutes.js';
import feedbackRoutes      from './routes/feedbackRoutes.js';
import reviewRoutes        from './routes/reviewRoutes.js';
import chatRoutes          from './routes/chatRoutes.js';
import movieRoutes         from './routes/movieRoutes.js';
import collectionRoutes    from './routes/collectionRoutes.js';
import partyRoutes from "./routes/partyRoutes.js";
import analyticsRoutes from './routes/analyticsRoutes.js';
import { errorHandler }    from './middlewares/errorHandler.js';
import configurePartySocket from "./sockets/partySocket.js";

const app = express();

// ── Passport strategies ───────────────────────────────────
configurePassport();
app.use(passport.initialize());

// ── Middleware ────────────────────────────────────────────
app.use(cors({
  origin:      process.env.CLIENT_URL || 'http://localhost:5173',
  credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

if (process.env.NODE_ENV !== 'production') {
  app.use(morgan('dev'));
}

// ── Routes ────────────────────────────────────────────────
app.use("/api/auth", authRoutes);
app.use("/api/feedback", feedbackRoutes);
app.use("/api/reviews", reviewRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/movies", movieRoutes);
app.use("/api/collections", collectionRoutes);
app.use("/api/party", partyRoutes);
app.use("/api/analytics", analyticsRoutes);

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

// ── Start ─────────────────────────────────────────────────
const PORT = process.env.PORT || 5000;

connectDB().then(() => {
  // Create HTTP server for Socket.IO
  const httpServer = http.createServer(app);

  // Initialize Socket.IO
  const io = new Server(httpServer, {
    cors: {
      origin: process.env.CLIENT_URL || "http://localhost:5173",
      credentials: true,
    },
    transports: ["websocket", "polling"],
  });

  // Configure party socket handlers
  configurePartySocket(io);

  httpServer.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
    console.log(`🔌 WebSocket ready`);
  });
});
