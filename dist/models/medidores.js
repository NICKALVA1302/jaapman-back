"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// medidor.ts
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../db/connection"));
const categoria_medidor_1 = __importDefault(require("./categoria_medidor"));
/* export interface MedidorInstance extends Model {
    id_medidor: number;
    id_estado_medidor: number;
    codigo: string;
    createdAt: Date;
    updatedAt: Date;
} */
const Medidores = connection_1.default.define('medidor', {
    id_medidor: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    id_estado_medidor: {
        type: sequelize_1.DataTypes.INTEGER
    },
    id_categoria: {
        type: sequelize_1.DataTypes.INTEGER
    },
    id_material: {
        type: sequelize_1.DataTypes.INTEGER
    },
    codigo: {
        type: sequelize_1.DataTypes.STRING
    }
}, {
//Para que no se coloque automaticamente el createdAt ni el updatedAt
//timestamps: false
});
Medidores.belongsTo(categoria_medidor_1.default, { foreignKey: 'id_categoria' });
exports.default = Medidores;
//# sourceMappingURL=medidores.js.map