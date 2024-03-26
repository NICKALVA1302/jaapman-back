"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../db/connection"));
const Estado_pago = connection_1.default.define('Estado_pago', {
    id_estado_pago: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    nombre: {
        type: sequelize_1.DataTypes.STRING
    }
}, {
    tableName: 'estado_pago',
});
exports.default = Estado_pago;
//# sourceMappingURL=estado_pago.js.map