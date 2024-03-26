"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// persona.ts
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../db/connection"));
const Personas = connection_1.default.define('persona', {
    id_persona: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true /* ,
        field: 'id_persona'  */
    },
    nombre: {
        type: sequelize_1.DataTypes.STRING
    },
    apellido: {
        type: sequelize_1.DataTypes.STRING
    },
    cedula: {
        type: sequelize_1.DataTypes.INTEGER
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
//Para que no se coloque automaticamente el createdAt ni el updatedAt
//timestamps: false
});
exports.default = Personas;
//# sourceMappingURL=personas.js.map