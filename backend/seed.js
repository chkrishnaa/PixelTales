/**
 * Seed script — creates the dummy admin account.
 * Run once: node seed.js
 * Replace credentials in .env before going to production.
 */
import dotenv    from 'dotenv';
import mongoose  from 'mongoose';
import User      from './models/User.js';

dotenv.config();

const ADMIN = {
  name:     'PixelTales Admin',
  email:    'admin@pixeltales.com',
  password: 'Admin@PixelTales2026',
  role:     'admin',
  isVerified: true,
};

async function seed() {
  await mongoose.connect(process.env.MONGO_URI);
  console.log('✅ Connected to MongoDB');

  const existing = await User.findOne({ email: ADMIN.email });
  if (existing) {
    console.log('ℹ️  Admin already exists:', ADMIN.email);
  } else {
    await User.create(ADMIN);
    console.log('🌱 Admin seeded:', ADMIN.email, '/ password:', ADMIN.password);
  }

  await mongoose.disconnect();
  console.log('🔌 Disconnected');
}

seed().catch((err) => { console.error(err); process.exit(1); });
