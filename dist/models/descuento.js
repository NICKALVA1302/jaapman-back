"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../db/connection"));
const Descuento = connection_1.default.define('Descuento', {
    id_descuento: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    id_estado: {
        type: sequelize_1.DataTypes.STRING
    },
    codigo: {
        type: sequelize_1.DataTypes.STRING
    },
    valor_porcentaje: {
        type: sequelize_1.DataTypes.STRING
    }
}, {
    tableName: 'descuento',
});
exports.default = Descuento;
//# sourceMappingURL=descuento.js.map