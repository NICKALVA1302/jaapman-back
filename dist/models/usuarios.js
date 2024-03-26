"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// usuario.ts
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../db/connection"));
const personas_1 = __importDefault(require("./personas"));
const localidades_1 = __importDefault(require("./localidades"));
const responsable_lecturas_1 = __importDefault(require("./responsable_lecturas"));
const medidores_1 = __importDefault(require("./medidores"));
const planillas_1 = __importDefault(require("./planillas"));
const login_1 = require("./login");
const instalacion_1 = __importDefault(require("./instalacion"));
const Usuarios = connection_1.default.define('usuario', {
    id_usuario: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true /* ,
        field: 'id_usuario'  */
    },
    id_persona: {
        type: sequelize_1.DataTypes.INTEGER
    },
    id_localidad: {
        type: sequelize_1.DataTypes.INTEGER
    },
    id_medidor: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true
    },
    id_estado: {
        type: sequelize_1.DataTypes.INTEGER
    },
    id_login: {
        type: sequelize_1.DataTypes.INTEGER,
        references: {
            model: login_1.login,
            key: 'id_login',
        }
    }
});
/* RELACIONES CON OTRAS TABLAS */
Usuarios.belongsTo(personas_1.default, { foreignKey: "id_persona" });
personas_1.default.hasMany(Usuarios, { foreignKey: "id_persona" });
Usuarios.belongsTo(localidades_1.default, { foreignKey: "id_localidad" });
localidades_1.default.hasMany(Usuarios, { foreignKey: "id_localidad" });
Usuarios.belongsTo(responsable_lecturas_1.default, { foreignKey: "id_usuario" });
responsable_lecturas_1.default.hasMany(Usuarios, { foreignKey: "id_usuario" });
Usuarios.belongsTo(medidores_1.default, { foreignKey: "id_medidor" });
medidores_1.default.hasMany(Usuarios, { foreignKey: "id_medidor" });
/*
// En el modelo Usuario
Usuarios.hasMany(Planillas, { foreignKey: 'id_usuario' }); */
planillas_1.default.belongsTo(Usuarios, { foreignKey: "id_usuario" });
Usuarios.hasMany(planillas_1.default, { foreignKey: "id_usuario" });
Usuarios.belongsTo(login_1.login, { foreignKey: 'id_login', as: 'userLogin' });
Usuarios.hasOne(instalacion_1.default, { foreignKey: 'id_usuario' });
exports.default = Usuarios;
//# sourceMappingURL=usuarios.js.map