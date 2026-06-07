import jwt  from 'jsonwebtoken';
import User from '../models/User.js';

/** Verify JWT from Authorization header and attach user to req */
export const protect = async (req, res, next) => {
  try {
    const header = req.headers.authorization;
    if (!header?.startsWith('Bearer ')) {
      return res.status(401).json({ success: false, message: 'Not authenticated. Please log in.' });
    }

    const token = header.split(' ')[1];
    const payload = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(payload.id).select('-password');
    if (!user) {
      return res.status(401).json({ success: false, message: 'User no longer exists.' });
    }

    req.user = user;
    next();
  } catch (err) {
    return res.status(401).json({ success: false, message: 'Invalid or expired token.' });
  }
};

/** Like protect but doesn't reject — attaches user if token present */
export const optionalAuth = async (req, res, next) => {
  try {
    const header = req.headers.authorization;
    if (header?.startsWith('Bearer ')) {
      const token   = header.split(' ')[1];
      const payload = jwt.verify(token, process.env.JWT_SECRET);
      const user    = await User.findById(payload.id).select('-password');
      if (user) req.user = user;
    }
  } catch (_) {
    // silently ignore — unauthenticated is fine for optional routes
  }
  next();
};

/** Allow only admins */
export const adminOnly = (req, res, next) => {
  if (req.user?.role !== 'admin') {
    return res.status(403).json({ success: false, message: 'Admin access required.' });
  }
  next();
};
