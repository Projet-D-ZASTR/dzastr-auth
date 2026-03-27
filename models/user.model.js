import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/database.js';

export class User extends Model {}

User.init(
  {
    User_Id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    User_Username: {
      type: DataTypes.STRING(80),
      allowNull: false,
      unique: false,
    },
    User_Role: {
      type: DataTypes.STRING(80),
      allowNull: false,
      unique: false,
    },
    User_Password: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: false,
    },
    User_Email: {
      type: DataTypes.STRING(80),
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    User_Entreprise: {
      type: DataTypes.STRING(80),
      allowNull: true,
      unique: false,
    },
    User_Address: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    User_IsEntrepreneur: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  },
  {
    sequelize,
    modelName: 'User',
    tableName: 'users',
    timestamps: false,
  }
);