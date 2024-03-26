"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../db/connection"));
const Instalacion = connection_1.default.define('Instalacion', {
    id_instalacion: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    id_usuario: {
        type: sequelize_1.DataTypes.INTEGER
    },
    id_estado_pago: {
        type: sequelize_1.DataTypes.INTEGER
    },
    valor: {
        type: sequelize_1.DataTypes.DOUBLE
    }
}, {
    tableName: 'instalacion',
});
exports.default = Instalacion;
//# sourceMappingURL=instalacion.js.map