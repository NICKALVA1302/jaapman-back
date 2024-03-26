"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// localidad.ts
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../db/connection"));
/* export interface LocalidadInstance extends Model {
    id_localidad: number;
    id_estado: number;
    nombre: string;
    descripcion: string;
    createdAt: Date;
    updatedAt: Date;
} */
const Localidades = connection_1.default.define('localidad', {
    id_localidad: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
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
//Para que no se coloque automaticamente el createdAt ni el updatedAt
//timestamps: false
});
exports.default = Localidades;
//# sourceMappingURL=localidades.js.map