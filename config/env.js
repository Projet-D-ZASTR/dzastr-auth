import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });
import process from 'process';

export const env = {
  port: process.env.PORT,
  nodeEnv: process.env.NODE_ENV,
  authServiceToken: process.env.AUTH_SERVICE_TOKEN,
  db: {
    url: process.env.DB_URL,
  },
  jwt: {
    secret: process.env.JWT_SECRET,
    expiresIn: process.env.JWT_EXPIRES_IN,
  },
};