"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../db/connection"));
const localidades_1 = __importDefault(require("./localidades"));
/* import Personas from "./personas";
import Localidades from "./localidades"; */
const ResponsableLecturas = connection_1.default.define('responsable_lectura', {
    id_responsable_lectura: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true /* ,
        field: 'id_usuario'  */
    },
    id_usuario: {
        type: sequelize_1.DataTypes.INTEGER
    },
    id_usuario_rol: {
        type: sequelize_1.DataTypes.INTEGER
    },
    id_localidad: {
        type: sequelize_1.DataTypes.INTEGER
    },
    id_apertura: {
        type: sequelize_1.DataTypes.INTEGER
    },
    id_estado: {
        type: sequelize_1.DataTypes.INTEGER
    },
    nombre_resp_edit: {
        type: sequelize_1.DataTypes.STRING
    },
    /* nombre_responsable:{
        type:DataTypes.STRING
    }, */
    fecha: {
        type: sequelize_1.DataTypes.DATE
    }
}, {
//Para que no se coloque automaticamente el createdAt ni el updatedAt
//timestamps: false
});
ResponsableLecturas.belongsTo(localidades_1.default, { foreignKey: "id_localidad" });
localidades_1.default.hasMany(ResponsableLecturas, { foreignKey: "id_localidad" });
/*

/*   Inscripcion.belongsTo(Persona, {foreignKey : "id_persona"});
  Persona.hasMany(Inscripcion,{foreignKey : "id_persona"});

  Inscripcion.belongsTo(Oferta, {foreignKey : "id_oferta"});
  Oferta.hasMany(Inscripcion,{foreignKey : "id_oferta"});
 */
exports.default = ResponsableLecturas;
//# sourceMappingURL=responsable_lecturas.js.map