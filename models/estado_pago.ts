import { DataTypes } from "sequelize";
import db from "../db/connection";



const Estado_pago = db.define('Estado_pago',{
    id_estado_pago: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    nombre: {
        type: DataTypes.STRING
    }
},{
    tableName: 'estado_pago',
});


export default Estado_pago;