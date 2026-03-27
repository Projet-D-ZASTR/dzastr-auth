import Joi from 'joi';
import { userService } from '../services/user.service.js';

const createUserSchema = Joi.object({
  User_Username: Joi.string().min(2).max(50).required(),
  User_Role: Joi.string().min(0).max(50).required(),
  User_Email: Joi.string().email().required(),
  User_Password: Joi.string().min(6).max(80).required(),
});

const updateUserSchema = Joi.object({
  User_Username: Joi.string().min(2).max(50).required(),
  User_Role: Joi.string().min(0).max(50).required(),
  User_Email: Joi.string().email().required(),
  User_Password: Joi.string().min(6).max(80).required(),
}).min(1);

export const userController = {
  /**
 * @swagger
 * /api/users/:
 *   post:
 *     summary: Create a new user
 *     tags:
 *       - Users
 *     parameters:
 *       - in: header
 *         name: x-service-token
 *         required: true
 *         schema:
 *           type: string
 *         description: Service token for authentication
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               User_Username:
 *                 type: string
 *                 example: johndoe
 *               User_Role:
 *                 type: string
 *                 example: admin
 *               User_Email:
 *                 type: string
 *                 format: email
 *                 example: johndoe@example.com
 *               User_Password:
 *                 type: string
 *                 format: password
 *                 example: mysecretpassword
 *             required:
 *               - User_Username
 *               - User_Role
 *               - User_Email
 *               - User_Password
 *     responses:
 *       201:
 *         description: User created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 User_Username:
 *                   type: string
 *                 User_Role:
 *                   type: string
 *                 User_Email:
 *                   type: string
 *       400:
 *         description: Validation error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "User_Username is required"
 *       409:
 *         description: Conflict error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "E-mail already used"
 *       500:
 *         description: Internal server error
 */
  createUser: async (req, res, next) => {
    try {
      const { error, value } = createUserSchema.validate(req.body);
      if (error) {
        return res.status(400).json({ message: error.message });
      }

      const user = await userService.createUser(value);

      return res.status(201).json({
        User_Username: user.User_Username,
        User_Role: user.User_Role,
        User_Email: user.User_Email,
      });
    } catch (err) {
      next(err);
    }
  },

  // GET /users
  getUsers: async (req, res, next) => {
    try {
      const users = await userService.getAllUsers();

      const payload = users.map((u) => ({
        User_Id: u.User_Id,
        User_Username: u.User_Username,
        User_Role: u.User_Role,
        User_Email: u.User_Email,
      }));

      return res.status(200).json(payload);
    } catch (err) {
      next(err);
    }
  },

  // GET /users/:id
  getUserById: async (req, res, next) => {
    try {
      const { id } = req.params;
      const user = await userService.getUserById(id);

      return res.status(200).json({
        User_Id: user.User_Id,
        User_Username: user.User_Username,
        User_Role: user.User_Role,
        User_Email: user.User_Email,
      });
    } catch (err) {
      next(err);
    }
  },

  // PUT /users/:id
  updateUser: async (req, res, next) => {
    try {
      const { id } = req.params;

      const { error, value } = updateUserSchema.validate(req.body);
      if (error) {
        return res.status(400).json({ message: error.message });
      }

      const updated = await userService.updateUser(id, value);

      return res.status(200).json({
        User_Username: updated.User_Username,
        User_Role: updated.User_Role,
        User_Email: updated.User_Email,
        User_Password: updated.User_Password,
      });
    } catch (err) {
      next(err);
    }
  },

  // DELETE /users/:id
  deleteUser: async (req, res, next) => {
    try {
      const { id } = req.params;

      await userService.deleteUser(id);

      return res.status(204).send();
    } catch (err) {
      next(err);
    }
  },
};