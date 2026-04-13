import dotenv from 'dotenv';
// Charge d'abord .env.local si présent, sinon .env.local
if (dotenv.config({ path: '.env.local' }).error) {
  dotenv.config({ path: '.env' });
}
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