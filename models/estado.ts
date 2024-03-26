import { DataTypes } from "sequelize";
import db from "../db/connection";



const Estado = db.define('Estado',{
    id_estado: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    nombre: {
        type: DataTypes.STRING
    }
},{
    tableName: 'estado',
});


export default Estado;