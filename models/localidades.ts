// localidad.ts
import { DataTypes, Model } from "sequelize";
import db from "../db/connection";

/* export interface LocalidadInstance extends Model {
    id_localidad: number;
    id_estado: number;
    nombre: string;
    descripcion: string;
    createdAt: Date;
    updatedAt: Date;
} */

const Localidades = db.define('localidad',{
    id_localidad: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    id_estado:{
        type:DataTypes.INTEGER
    },
    nombre: {
        type: DataTypes.STRING
    },
    descripcion: {
        type: DataTypes.STRING
    }
}, {
    
    //Para que no se coloque automaticamente el createdAt ni el updatedAt
    //timestamps: false
});

export default Localidades;
