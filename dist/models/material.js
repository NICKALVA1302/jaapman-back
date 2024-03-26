"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../db/connection"));
const estado_1 = __importDefault(require("./estado"));
const Material = connection_1.default.define('material', {
    id_material: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    id_estado: {
        type: sequelize_1.DataTypes.INTEGER
    },
    nombre: {
        type: sequelize_1.DataTypes.STRING
    },
    descripcion: {
        type: sequelize_1.DataTypes.STRING
    },
    stock: {
        type: sequelize_1.DataTypes.INTEGER
    },
    precio: {
        type: sequelize_1.DataTypes.DOUBLE
    }
}, {
    tableName: 'material'
});
//RELACIONES DE TABLAS 
Material.belongsTo(estado_1.default, { foreignKey: "id_estado" });
estado_1.default.hasMany(Material, { foreignKey: "id_estado" });
//, {
//     // createdAt: false,
//     // updatedAt: false,
//     // tableName: 'Materiales' // DEfinir nombre de la base de Datos
//     // // timestamps: true
// })
exports.default = Material;
//# sourceMappingURL=material.js.map