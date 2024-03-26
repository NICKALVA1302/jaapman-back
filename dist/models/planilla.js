"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../db/connection"));
const Planilla = connection_1.default.define('Planilla', {
    id_planilla: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    id_usuario: {
        type: sequelize_1.DataTypes.STRING
    },
    id_multa: {
        type: sequelize_1.DataTypes.STRING
    },
    id_descuento: {
        type: sequelize_1.DataTypes.STRING
    },
    id_estado_pago: {
        type: sequelize_1.DataTypes.STRING
    },
    id_responsable_lectura: {
        type: sequelize_1.DataTypes.STRING
    },
    id_estado: {
        type: sequelize_1.DataTypes.STRING
    },
    lectura_anterior: {
        type: sequelize_1.DataTypes.STRING
    },
    lectura_actual: {
        type: sequelize_1.DataTypes.STRING
    },
    consumo_minimo: {
        type: sequelize_1.DataTypes.STRING
    },
    consumo_total: {
        type: sequelize_1.DataTypes.STRING
    },
    total_pagar: {
        type: sequelize_1.DataTypes.STRING
    },
    observaciones: {
        type: sequelize_1.DataTypes.STRING
    },
}, {
    tableName: 'planilla',
});
exports.default = Planilla;
//# sourceMappingURL=planilla.js.map