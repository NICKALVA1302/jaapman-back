// persona.ts
import { DataTypes, Model } from "sequelize";
import db from "../db/connection";

export interface PersonaInstance extends Model {
    id_persona: number;
    nombre: string;
    apellido: string;
    cedula: string;
    direccion: string;
    telefono: string;
    genero: string;
    email: string;
    createdAt: Date;
    updatedAt: Date;
}

const Personas = db.define('persona',{
    id_persona: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true/* ,
        field: 'id_persona'  */
    },
    nombre: {
        type: DataTypes.STRING
    },
    apellido: {
        type: DataTypes.STRING
    },
    cedula: {
        type: DataTypes.INTEGER
    },
    direccion: {
        type: DataTypes.STRING
    },
    telefono: {
        type: DataTypes.STRING
    },
    genero: {
        type: DataTypes.STRING
    },
    email: {
        type: DataTypes.STRING
    }
}, {
    
    //Para que no se coloque automaticamente el createdAt ni el updatedAt
    //timestamps: false
});

export default Personas;