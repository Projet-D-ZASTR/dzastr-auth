import { Sequelize } from 'sequelize';
import { env } from './env.js';
import process from 'process';

if (!env.db.url) {
  throw new Error(
      'Missing database URL: define DATABASE_URL (Render) or DB_URL (local) before starting the auth service.'
  );
}

export const sequelize = new Sequelize(env.db.url, {
  dialect: 'postgres',
  logging: false,
});

export const initDatabase = async () => {
  try {
    await sequelize.authenticate();
    console.log('DB connected (PostgreSQL)');

    await sequelize.sync({ alter: true });
    console.log('DB synced');
  } catch (error) {
    console.error('DB connection error:', error);
    process.exit(1);
  }
};