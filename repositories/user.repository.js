import { User } from '../models/user.model.js'

export const userRepository = {
  findAll: async () => {
    return User.findAll()
  },

  findById: async (User_Id) => {
    return User.findByPk(User_Id)
  },

  findByEmail: async (User_Email) => {
    return User.findOne({ where: { User_Email } })
  },

  findByUsername: async (User_Username) => {
    return User.findOne({ where: { User_Username } })
  },

  create: async ({
    User_Username,
    User_Role,
    User_Password,
    User_Email,
    User_Entreprise,
    User_Address,
    User_IsEntrepreneur,
  }) => {
    return User.create({
      User_Username: User_Username,
      User_Role: User_Role,
      User_Password: User_Password,
      User_Email: User_Email,
      User_Entreprise: User_Entreprise,
      User_Address: User_Address,
      User_IsEntrepreneur: User_IsEntrepreneur,
    })
  },

  update: async (user, data) => {
    return user.update(data)
  },

  delete: async (user) => {
    return user.destroy()
  },
}
