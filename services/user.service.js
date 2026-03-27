import { userRepository } from '../repositories/user.repository.js';
import { hashPassword } from '../utils/password.js';

export const userService = {
  createUser: async ({ User_Username, User_Role, User_Password, User_Email }) => {
    console.log('Creating user with email:', User_Email);
    const existingEmail = await userRepository.findByEmail(User_Email);
    if (existingEmail) {
      const error = new Error('Email already used');
      error.status = 409;
      throw error;
    }

    const existingUsername = await userRepository.findByUsername(User_Username);
    if (existingUsername) {
      const error = new Error('Username already used');
      error.status = 409;
      throw error;
    }

    const passwordHash = await hashPassword(User_Password);

    const user = await userRepository.create({
      User_Username,
      User_Role,
      User_Email,
      User_Password: passwordHash,
    });

    return user;
  },

  // READ ALL
  getAllUsers: async () => {
    const users = await userRepository.findAll();
    return users;
  },

  // READ ONE
  getUserById: async (id) => {
    const user = await userRepository.findById(id);
    if (!user) {
      const error = new Error('User not found');
      error.status = 404;
      throw error;
    }
    return user;
  },

  // UPDATE
  updateUser: async (id, data) => {
    const user = await userRepository.findById(id);
    if (!user) {
      const error = new Error('User not found');
      error.status = 404;
      throw error;
    }

    // Unique email
    if (data.User_Email && data.User_Email !== user.User_Email) {
      const existingEmail = await userRepository.findByEmail(data.User_Email);
      if (existingEmail && existingEmail.User_Id !== user.User_Id) {
        const error = new Error('Email already used');
        error.status = 409;
        throw error;
      }
    }

    // Unique username
    if (data.User_Username && data.User_Username !== user.User_Username) {
      const existingUsername = await userRepository.findByUsername(data.User_Username);
      if (existingUsername && existingUsername.User_Id !== user.User_Id) {
        const error = new Error('Username already used');
        error.status = 409;
        throw error;
      }
    }

    // Hash the password if it's being updated
    if (data.User_Password) {
      data.User_Password = await hashPassword(data.User_Password);
    }

    const mappedData = {
      User_Username: data.User_Username,
      User_Role: data.User_Role,
      User_Email: data.User_Email,
      User_Password: data.User_Password,
    };

    const updated = await userRepository.update(user, mappedData);
    return updated;
  },

  // DELETE
  deleteUser: async (id) => {
    const user = await userRepository.findById(id);
    if (!user) {
      const error = new Error('User not found');
      error.status = 404;
      throw error;
    }

    await userRepository.delete(user);
    return;
  },
};