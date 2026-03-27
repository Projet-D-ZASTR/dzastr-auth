import { Sequelize } from 'sequelize';
import { env } from './env.js';

export const sequelize = new Sequelize(env.db.url, {
  dialect: 'postgres',
  logging: false,
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
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