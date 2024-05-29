import { DataTypes } from "sequelize";
import db from "../db/connection";


const AnioApertura = db.define('anio',{
    id_anio: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    id_estado: {
        type: DataTypes.INTEGER
    },
    descripcion: {
        type: DataTypes.STRING
    }
    
});

export default AnioApertura;