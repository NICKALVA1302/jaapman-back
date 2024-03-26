"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.rol = void 0;
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../db/connection"));
exports.rol = connection_1.default.define("rol", {
    id_rol: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    id_estado: {
        type: sequelize_1.DataTypes.NUMBER,
    },
    nombre: {
        type: sequelize_1.DataTypes.STRING,
    },
    descripcion: {
        type: sequelize_1.DataTypes.STRING,
    }
}, {
    tableName: 'rol',
});
//# sourceMappingURL=rol.js.map