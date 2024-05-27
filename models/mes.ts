import { DataTypes } from "sequelize";
import db from "../db/connection";


const MesApertura = db.define('mes',{
    id_mes: {
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

export default MesApertura;