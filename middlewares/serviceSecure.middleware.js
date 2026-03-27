import { env } from '../config/env.js';

export const checkServiceToken = (req, res, next) => {
  const serviceToken = req.headers['x-service-token'];

  if (!serviceToken || serviceToken !== env.authServiceToken) {
    return res.status(403).json({
      message: 'Forbidden ; wrong or missing service token. YOU SILLY MINSK',
    });
  }

  next();
};