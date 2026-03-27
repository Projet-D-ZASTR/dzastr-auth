import Joi from 'joi';
import jwt from 'jsonwebtoken';
import { secureService } from '../services/secure.service.js';
import { User } from '../models/user.model.js';
import { env } from '../config/env.js';


const registerSchema = Joi.object({
  User_Username: Joi.string().min(2).max(50).required(),
  User_Role: Joi.string().min(0).max(50).required(),
  User_Email: Joi.string().email().required(),
  User_Password: Joi.string().min(6).max(80).required(),
});

const loginSchema = Joi.object({
  User_Email: Joi.string().required(),
  User_Password: Joi.string().min(6).max(80).required(),
});

export const secureController = {
  register: async (req, res, next) => {
    try {
      const { error, value } = registerSchema.validate(req.body);
      if (error) {
        return res.status(400).json({ message: error.message });
      }

      const { User_Username, User_Role, User_Email, User_Password } = value;

      const result = await secureService.register({ User_Username, User_Role, User_Email, User_Password });

      return res.status(201).json({
        user: {
          User_Username: result.user.User_Username,
          User_Role: result.user.User_Role,
          User_Email: result.user.User_Email,
        },
        accessToken: result.accessToken,
      });
    } catch (err) {
      next(err);
    }
  },

  login: async (req, res, next) => {
    try {
      const { error, value } = loginSchema.validate(req.body);
      if (error) {
        return res.status(400).json({ message: error.message });
      }

      const { User_Email, User_Password } = value;

      const result = await secureService.login({ User_Email, User_Password });

      return res.status(200).json({
        user: {
          User_Username: result.user.User_Username,
          User_Role: result.user.User_Role,
          User_Email: result.user.User_Email,
        },
        accessToken: result.accessToken,
      });
    } catch (err) {
      next(err);
    }
  },
  verify: (req, res) => {
    try {
      const secureHeader = req.headers.authorization || '';

      if (!secureHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Wrong token.' });
      }

      const token = secureHeader.split(' ')[1];

      const decoded = jwt.verify(token, env.jwt.secret);

      return res.json({
        valid: true,
        user: {
          User_Id: decoded.User_Id,
          User_Email: decoded.User_Email,
        },
      });
    } catch (error) {
      console.error('Wrong token on verify :', error.message);
      return res.status(401).json({ valid: false, message: 'Wrong or expired token.' });
    }
  },
};