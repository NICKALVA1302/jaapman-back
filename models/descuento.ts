import { DataTypes } from "sequelize";
import db from "../db/connection";



const Descuento = db.define('Descuento',{
    id_descuento: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    id_estado: {
        type: DataTypes.STRING
    },
    codigo: {
        type: DataTypes.STRING
    },
    valor_porcentaje: {
        type: DataTypes.STRING
    }
},{
    tableName: 'descuento',
});


export default Descuento;