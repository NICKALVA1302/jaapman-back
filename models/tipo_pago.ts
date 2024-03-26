import { DataTypes } from "sequelize";
import db from "../db/connection";



const TipoPago = db.define('TipoPago',{
    id_tipopago: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    id_estado: {
        type: DataTypes.INTEGER
    },
    nombre: {
        type: DataTypes.STRING
    }
},{
    tableName: 'tipo_pago',
});


export default TipoPago;