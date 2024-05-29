import { DataTypes } from "sequelize";
import db from "../db/connection";
import Localidades from "./localidades";
/* import Personas from "./personas";
import Localidades from "./localidades"; */


const ResponsableLecturas = db.define('responsable_lectura', {
    id_responsable_lectura: { 
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true/* ,
        field: 'id_usuario'  */
    },
    id_usuario_rol:{
        type: DataTypes.INTEGER
    },
    id_localidad: {
        type: DataTypes.INTEGER
    },
    id_apertura: {
        type: DataTypes.INTEGER
    },
    id_estado:{
        type:DataTypes.INTEGER
    },
    fecha:{
        type:DataTypes.DATE
    }
    }, {
        
        //Para que no se coloque automaticamente el createdAt ni el updatedAt
        //timestamps: false
    });
    
    ResponsableLecturas.belongsTo(Localidades, {foreignKey : "id_localidad"});
    Localidades.hasMany(ResponsableLecturas,{foreignKey : "id_localidad"});
    /* 
    
    /*   Inscripcion.belongsTo(Persona, {foreignKey : "id_persona"});
      Persona.hasMany(Inscripcion,{foreignKey : "id_persona"});
    
      Inscripcion.belongsTo(Oferta, {foreignKey : "id_oferta"});
      Oferta.hasMany(Inscripcion,{foreignKey : "id_oferta"});
     */
    
      export default ResponsableLecturas;