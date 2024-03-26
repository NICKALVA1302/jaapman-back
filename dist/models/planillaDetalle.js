"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../db/connection"));
const mantenimiento_1 = __importDefault(require("./mantenimiento"));
const alcantarillado_1 = __importDefault(require("./alcantarillado"));
const instalacion_1 = __importDefault(require("./instalacion"));
const PlanillaDetalle = connection_1.default.define('PlanillaDetalle', {
    id_planilla_det: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    id_planilla: {
        type: sequelize_1.DataTypes.INTEGER
    },
    id_alcantarillado: {
        type: sequelize_1.DataTypes.INTEGER
    },
    id_instalacion: {
        type: sequelize_1.DataTypes.INTEGER
    },
    id_mantenimiento: {
        type: sequelize_1.DataTypes.INTEGER
    },
    id_estado: {
        type: sequelize_1.DataTypes.INTEGER
    },
    total_pago: {
        type: sequelize_1.DataTypes.DOUBLE
    },
    deuda_pendiente: {
        type: sequelize_1.DataTypes.DOUBLE
    },
    descripcion: {
        type: sequelize_1.DataTypes.STRING
    }
}, {
    tableName: 'planilla_detalle',
});
PlanillaDetalle.belongsTo(mantenimiento_1.default, { foreignKey: 'id_mantenimiento' }); // Configura la asociación con Mantenimiento
PlanillaDetalle.belongsTo(alcantarillado_1.default, { foreignKey: 'id_alcantarillado' });
PlanillaDetalle.belongsTo(instalacion_1.default, { foreignKey: 'id_instalacion' });
exports.default = PlanillaDetalle;
//# sourceMappingURL=planillaDetalle.js.map