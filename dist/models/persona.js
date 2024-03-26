"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// persona.ts
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../db/connection"));
const Persona = connection_1.default.define('Persona', {
    id_persona: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    nombre: {
        type: sequelize_1.DataTypes.STRING
    },
    apellido: {
        type: sequelize_1.DataTypes.STRING
    },
    cedula: {
        type: sequelize_1.DataTypes.STRING
    },
    direccion: {
        type: sequelize_1.DataTypes.STRING
    },
    telefono: {
        type: sequelize_1.DataTypes.STRING
    },
    genero: {
        type: sequelize_1.DataTypes.STRING
    },
    email: {
        type: sequelize_1.DataTypes.STRING
    }
}, {
    tableName: 'persona',
});
exports.default = Persona;
//# sourceMappingURL=persona.js.map