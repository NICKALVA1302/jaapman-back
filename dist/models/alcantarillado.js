"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../db/connection"));
const tarifa_1 = __importDefault(require("./tarifa"));
const Alcantarillado = connection_1.default.define('Alcantarillado', {
    id_alcantarillado: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    id_usuario: {
        type: sequelize_1.DataTypes.INTEGER
    },
    id_estado: {
        type: sequelize_1.DataTypes.INTEGER
    },
    id_tarifa: {
        type: sequelize_1.DataTypes.INTEGER
    },
    id_estado_pago: {
        type: sequelize_1.DataTypes.INTEGER
    },
    inscrito: {
        type: sequelize_1.DataTypes.STRING
    }
}, {
    tableName: 'alcantarillado',
});
Alcantarillado.belongsTo(tarifa_1.default, { foreignKey: 'id_tarifa' });
exports.default = Alcantarillado;
//# sourceMappingURL=alcantarillado.js.map