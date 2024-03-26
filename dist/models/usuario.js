"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// usuario.ts
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../db/connection"));
const medidor_1 = __importDefault(require("./medidor"));
const persona_1 = __importDefault(require("./persona"));
const localidad_1 = __importDefault(require("./localidad"));
const Usuario = connection_1.default.define('Usuario', {
    id_usuario: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    id_persona: {
        type: sequelize_1.DataTypes.INTEGER
    },
    id_localidad: {
        type: sequelize_1.DataTypes.INTEGER
    },
    id_medidor: {
        type: sequelize_1.DataTypes.INTEGER
    },
    id_estado: {
        type: sequelize_1.DataTypes.INTEGER
    },
    id_login: {
        type: sequelize_1.DataTypes.INTEGER
    }
}, {
    tableName: 'usuario',
});
Usuario.belongsTo(medidor_1.default, { foreignKey: 'id_medidor' }); // Usuario pertenece a un Medidor
Usuario.belongsTo(persona_1.default, { foreignKey: 'id_persona' }); // Usuario pertenece a una Persona
Usuario.belongsTo(localidad_1.default, { foreignKey: 'id_localidad' }); // Usuario pertenece a una Localidad
exports.default = Usuario;
//# sourceMappingURL=usuario.js.map