"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = void 0;
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../db/connection"));
exports.login = connection_1.default.define("login", {
    id_login: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    usuario: {
        type: sequelize_1.DataTypes.STRING,
    },
    clave: {
        type: sequelize_1.DataTypes.STRING,
    },
    token: {
        type: sequelize_1.DataTypes.STRING,
        unique: true,
    },
    otp: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true
    },
}, {
    tableName: 'login',
});
//# sourceMappingURL=login.js.map