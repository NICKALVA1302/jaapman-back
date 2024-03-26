"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../db/connection"));
const Tarifa = connection_1.default.define('Tarifa', {
    id_tarifa: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    rango: {
        type: sequelize_1.DataTypes.STRING
    },
    valor: {
        type: sequelize_1.DataTypes.DOUBLE
    }
}, {
    tableName: 'tarifa',
});
exports.default = Tarifa;
//# sourceMappingURL=tarifa.js.map