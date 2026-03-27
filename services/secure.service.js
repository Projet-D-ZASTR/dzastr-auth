import { userRepository } from '../repositories/user.repository.js';
import { hashPassword, comparePassword } from '../utils/password.js';
import { generateAccessToken } from '../utils/jwt.js';

export const secureService = {
  register: async ({ User_Username, User_Role, User_Password, User_Email }) => {
    const existingByEmail = await userRepository.findByEmail(User_Email);
    if (existingByEmail) {
      const error = new Error('Email already used');
      error.status = 409;
      throw error;
    }

    const existingByUsername = await userRepository.findByUsername(User_Username);
    if (existingByUsername) {
      const error = new Error('Username already used');
      error.status = 409;
      throw error;
    }

    const passwordHash = await hashPassword(User_Password);

    const user = await userRepository.create({
      User_Username,
      User_Role,
      User_Password: passwordHash,
      User_Email,
    });

    const payload = {
      User_Id: user.User_Id,
      User_Username: user.User_Username,
      User_Role: user.User_Role,
      User_Email: user.User_Email,
    };

    const accessToken = generateAccessToken(payload);

    return { user, accessToken };
  },

  login: async ({ User_Email, User_Password }) => {
    let user = await userRepository.findByEmail(User_Email);

    if (!user) {
      user = await userRepository.findByUsername(User_Email);
      if (!user) {
        const error = new Error('No user found with this email or username');
        error.status = 401;
        throw error;
      }
    }

    const isValid = await comparePassword(User_Password, user.User_Password);
    if (!isValid) {
      const error = new Error('Wrong credentials');
      error.status = 401;
      throw error;
    }

    const payload = {
      User_Id: user.User_Id,
      User_Username: user.User_Username,
      User_Role: user.User_Role,
      User_Email: user.User_Email,
    };

    const accessToken = generateAccessToken(payload);

    return { user, accessToken };
  },
};