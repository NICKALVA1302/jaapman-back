"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// localidad.ts
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../db/connection"));
const Localidad = connection_1.default.define('Localidad', {
    id_localidad: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    id_estado: {
        type: sequelize_1.DataTypes.INTEGER
    },
    nombre: {
        type: sequelize_1.DataTypes.STRING
    },
    descripcion: {
        type: sequelize_1.DataTypes.STRING
    }
}, {
    tableName: 'localidad',
});
exports.default = Localidad;
//# sourceMappingURL=localidad.js.map