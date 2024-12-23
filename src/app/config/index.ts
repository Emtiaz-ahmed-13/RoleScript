import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(process.cwd(), '.env') });

export default {
  NODE_ENV: process.env.NODE_ENV || 'development',
  port: process.env.PORT || 3000,
  database_url: process.env.DATABASE_URL,
  default_password: process.env.DEFAULT_PASS,
  bcrypt_salt_rounds: Number(process.env.BCRYPT_SALT_ROUNDS) || 10,
  jwt_access_secret: process.env.JWT_ACCESS_SECRET || process.env.JWT_SECRET,
  jwt_access_expires_in: process.env.JWT_ACCESS_EXPIRES_IN || '1d',
};
