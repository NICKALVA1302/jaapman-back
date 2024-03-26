"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../db/connection"));
const TipoPago = connection_1.default.define('TipoPago', {
    id_tipopago: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    id_estado: {
        type: sequelize_1.DataTypes.INTEGER
    },
    nombre: {
        type: sequelize_1.DataTypes.STRING
    }
}, {
    tableName: 'tipo_pago',
});
exports.default = TipoPago;
//# sourceMappingURL=tipo_pago.js.map