import { DataTypes } from "sequelize";
import db from "../db/connection";


const AperturaLectura = db.define('apertura_lectura',{
    id_apertura: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    id_anio: {
        type: DataTypes.INTEGER
    },
    id_mes: {
        type: DataTypes.INTEGER
    },
    id_estado_apertura: {
        type: DataTypes.INTEGER
    },
    num_personas: {
        type: DataTypes.INTEGER
    },
    observacion: {
        type: DataTypes.STRING
    },
    fecha: {
        type: DataTypes.DATE
    },
    fecha_fin: {
        type: DataTypes.DATE
    }
    
});

export default AperturaLectura;