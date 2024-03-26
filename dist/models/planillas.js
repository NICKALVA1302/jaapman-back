"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../db/connection"));
const planillaDetalle_1 = __importDefault(require("./planillaDetalle"));
const Planillas = connection_1.default.define('planilla', {
    id_planilla: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true /* ,
        field: 'id_usuario'  */
    },
    id_usuario: {
        type: sequelize_1.DataTypes.INTEGER
    },
    id_multa: {
        type: sequelize_1.DataTypes.INTEGER
    },
    id_responsable_lectura: {
        type: sequelize_1.DataTypes.INTEGER
    },
    id_estado_pago: {
        type: sequelize_1.DataTypes.INTEGER,
    },
    id_estado: {
        type: sequelize_1.DataTypes.INTEGER
    },
    id_descuento: {
        type: sequelize_1.DataTypes.INTEGER
    },
    lectura_anterior: {
        type: sequelize_1.DataTypes.STRING
    },
    lectura_actual: {
        type: sequelize_1.DataTypes.STRING
    },
    consumo_total: {
        type: sequelize_1.DataTypes.STRING
    },
    estado_lectura: {
        type: sequelize_1.DataTypes.STRING
    },
    nom_resp_edit: {
        type: sequelize_1.DataTypes.STRING
    },
    total_pagar: {
        type: sequelize_1.DataTypes.STRING
    },
    observaciones: {
        type: sequelize_1.DataTypes.STRING
    }
});
Planillas.hasMany(planillaDetalle_1.default, { foreignKey: 'id_planilla' });
exports.default = Planillas;
//# sourceMappingURL=planillas.js.map