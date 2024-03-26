import { DataTypes } from "sequelize";
import db from "../db/connection";



const Tarifa = db.define('Tarifa',{
    id_tarifa: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    rango: {
        type: DataTypes.STRING
    },
    valor: {
        type: DataTypes.DOUBLE
    }
},{
    tableName: 'tarifa',
});


export default Tarifa;