/**
 * Seed script — creates / updates the admin account.
 * Set ADMIN_NAME, ADMIN_EMAIL, ADMIN_PASSWORD in .env, then run:
 *   npm run seed
 */
import 'dotenv/config';
import mongoose from 'mongoose';
import User     from './models/User.js';

const ADMIN = {
  name:       process.env.ADMIN_NAME     || 'PixelTales Admin',
  email:      process.env.ADMIN_EMAIL    || 'admin@pixeltales.com',
  password:   process.env.ADMIN_PASSWORD || 'Admin@PixelTales2026',
  role:       'admin',
  isVerified: true,
};

async function seed() {
  if (!process.env.MONGO_URI) {
    console.error('❌  MONGO_URI is not set. Check your .env file.');
    process.exit(1);
  }

  await mongoose.connect(process.env.MONGO_URI);
  console.log('✅  Connected to MongoDB');

  const existing = await User.findOne({ email: ADMIN.email });

  if (existing) {
    // Update role + mark verified in case they signed up via Google first
    existing.role       = 'admin';
    existing.isVerified = true;
    existing.name       = ADMIN.name;
    if (ADMIN.password) {
      existing.password = ADMIN.password;   // pre-save hook will re-hash
    }
    await existing.save();
    console.log('🔄  Existing account upgraded to admin:', ADMIN.email);
  } else {
    await User.create(ADMIN);
    console.log('🌱  Admin created:', ADMIN.email);
    console.log('🔑  Password:     ', ADMIN.password);
  }

  await mongoose.disconnect();
  console.log('🔌  Done.');
}

seed().catch((err) => { console.error(err); process.exit(1); });
