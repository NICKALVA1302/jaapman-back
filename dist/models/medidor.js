"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// medidor.ts
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../db/connection"));
const Medidor = connection_1.default.define('Medidor', {
    id_medidor: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    id_estado_medidor: {
        type: sequelize_1.DataTypes.INTEGER
    },
    codigo: {
        type: sequelize_1.DataTypes.STRING
    }
}, {
    tableName: 'medidor',
});
exports.default = Medidor;
//# sourceMappingURL=medidor.js.map