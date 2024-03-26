"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../db/connection"));
const material_1 = __importDefault(require("./material"));
const mantenimiento_1 = __importDefault(require("./mantenimiento"));
const Mantenimiento_detalle = connection_1.default.define('mantenimiento_detalle', {
    id_mantenimiento_detalle: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    id_mantenimiento: {
        type: sequelize_1.DataTypes.INTEGER
    },
    id_material: {
        type: sequelize_1.DataTypes.INTEGER
    },
    cantidad: {
        type: sequelize_1.DataTypes.INTEGER
    },
    subtotal: {
        type: sequelize_1.DataTypes.DOUBLE
    }
}, {
    tableName: 'mantenimiento_detalle'
});
//Relaciones
Mantenimiento_detalle.belongsTo(material_1.default, { foreignKey: "id_material" });
material_1.default.hasMany(Mantenimiento_detalle, { foreignKey: "id_material" });
Mantenimiento_detalle.belongsTo(mantenimiento_1.default, { foreignKey: "id_mantenimiento" });
mantenimiento_1.default.hasMany(Mantenimiento_detalle, { foreignKey: "id_mantenimiento" });
exports.default = Mantenimiento_detalle;
//# sourceMappingURL=mantenimiento_detalle.js.map