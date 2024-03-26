import { DataTypes, Model } from "sequelize";
import sequelize from "../db/connection";

interface LoginAttributes {
  id_login?: number;
  usuario: string;
  clave: string;
  token: string;
  otp?: string | null;
}

interface LoginCreationAttributes extends Omit<LoginAttributes, "id_login"> {}

export interface LoginInstance extends Model<LoginAttributes, LoginCreationAttributes>, LoginAttributes {}

export const login = sequelize.define<LoginInstance>("login", {
  id_login: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  usuario: {
    type: DataTypes.STRING,
  },
  clave: {
    type: DataTypes.STRING,
  },
  token: {
    type: DataTypes.STRING,
    unique: true,
  },
  otp: {
    type: DataTypes.STRING,
    allowNull: true
  },
}, {
  tableName: 'login',
});