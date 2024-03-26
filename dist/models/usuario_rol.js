"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.usuario_rol = void 0;
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../db/connection"));
const rol_1 = require("../models/rol");
exports.usuario_rol = connection_1.default.define("usuario_rol", {
    id_usuario_rol: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    id_usuario: {
        type: sequelize_1.DataTypes.NUMBER,
    },
    id_rol: {
        type: sequelize_1.DataTypes.NUMBER,
    }
}, {
    tableName: 'usuario_rol',
});
exports.usuario_rol.belongsTo(rol_1.rol, { foreignKey: 'id_rol', as: 'rol' });
//# sourceMappingURL=usuario_rol.js.map