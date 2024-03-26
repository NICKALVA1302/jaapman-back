"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../db/connection"));
const Mantenimiento = connection_1.default.define('Mantenimiento', {
    id_mantenimiento: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    id_usuario: {
        type: sequelize_1.DataTypes.INTEGER
    },
    id_tarifa: {
        type: sequelize_1.DataTypes.INTEGER
    },
    id_estado_pago: {
        type: sequelize_1.DataTypes.INTEGER
    },
    total: {
        type: sequelize_1.DataTypes.DOUBLE
    }
}, {
    tableName: 'mantenimiento',
});
exports.default = Mantenimiento;
//# sourceMappingURL=mantenimiento.js.map