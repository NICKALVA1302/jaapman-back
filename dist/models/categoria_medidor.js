"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../db/connection"));
const categoriaMedidor = connection_1.default.define('categoria_medidor', {
    id_categoria: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    nombre: {
        type: sequelize_1.DataTypes.STRING
    },
    cantidad_base: {
        type: sequelize_1.DataTypes.STRING
    },
    costo: {
        type: sequelize_1.DataTypes.DOUBLE
    },
    exedente: {
        type: sequelize_1.DataTypes.DOUBLE
    }
}, {
    tableName: 'categorias_medidor',
});
exports.default = categoriaMedidor;
//# sourceMappingURL=categoria_medidor.js.map