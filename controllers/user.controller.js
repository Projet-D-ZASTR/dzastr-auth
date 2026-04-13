import Joi from 'joi'
import { userService } from '../services/user.service.js'

const createUserSchema = Joi.object({
  User_Username: Joi.string().min(2).max(50).required(),
  User_Role: Joi.string().min(0).max(50).required(),
  User_Email: Joi.string().email().required(),
  User_Password: Joi.string().min(6).max(80).required(),
  User_Entreprise: Joi.string().min(0).max(80).optional(),
  User_Address: Joi.string().min(0).max(255).optional(),
  User_IsEntrepreneur: Joi.boolean().optional(),
})

const updateUserSchema = Joi.object({
  User_Username: Joi.string().min(2).max(50).required(),
  User_Role: Joi.string().min(0).max(50).required(),
  User_Email: Joi.string().email().required(),
  User_Password: Joi.string().min(6).max(80).required(),
  User_Entreprise: Joi.string().min(0).max(80).optional(),
  User_Address: Joi.string().min(0).max(255).optional(),
  User_IsEntrepreneur: Joi.boolean().optional(),
}).min(1)

export const userController = {
  createUser: async (req, res, next) => {
    try {
      const { error, value } = createUserSchema.validate(req.body)
      if (error) {
        return res.status(400).json({ message: error.message })
      }

      const user = await userService.createUser(value)

      return res.status(201).json({
        User_Username: user.User_Username,
        User_Role: user.User_Role,
        User_Email: user.User_Email,
        User_Entreprise: user.User_Entreprise,
        User_Address: user.User_Address,
        User_IsEntrepreneur: user.User_IsEntrepreneur,
      })
    } catch (err) {
      next(err)
    }
  },

  getUsers: async (req, res, next) => {
    try {
      const users = await userService.getAllUsers()

      const payload = users.map((u) => ({
        User_Id: u.User_Id,
        User_Username: u.User_Username,
        User_Role: u.User_Role,
        User_Email: u.User_Email,
        User_Entreprise: u.User_Entreprise,
        User_Address: u.User_Address,
        User_IsEntrepreneur: u.User_IsEntrepreneur,
      }))

      return res.status(200).json(payload)
    } catch (err) {
      next(err)
    }
  },

  getUserById: async (req, res, next) => {
    try {
      const { id } = req.params
      const user = await userService.getUserById(id)

      return res.status(200).json({
        User_Id: user.User_Id,
        User_Username: user.User_Username,
        User_Role: user.User_Role,
        User_Email: user.User_Email,
        User_Entreprise: user.User_Entreprise,
        User_Address: user.User_Address,
        User_IsEntrepreneur: user.User_IsEntrepreneur,
      })
    } catch (err) {
      next(err)
    }
  },

  updateUser: async (req, res, next) => {
    try {
      const { id } = req.params

      const { error, value } = updateUserSchema.validate(req.body)
      if (error) {
        return res.status(400).json({ message: error.message })
      }

      const updated = await userService.updateUser(id, value)

      return res.status(200).json({
        User_Username: updated.User_Username,
        User_Role: updated.User_Role,
        User_Email: updated.User_Email,
        User_Password: updated.User_Password,
        User_Entreprise: updated.User_Entreprise,
        User_Address: updated.User_Address,
        User_IsEntrepreneur: updated.User_IsEntrepreneur,
      })
    } catch (err) {
      next(err)
    }
  },

  deleteUser: async (req, res, next) => {
    try {
      const { id } = req.params

      await userService.deleteUser(id)

      return res.status(204).send()
    } catch (err) {
      next(err)
    }
  },
}
