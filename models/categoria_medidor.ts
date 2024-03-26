import { DataTypes } from "sequelize";
import db from "../db/connection";
import Medidores from "./medidores";



const categoriaMedidor = db.define('categoria_medidor',{
    id_categoria: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    nombre: {
        type:DataTypes.STRING
    },
    cantidad_base: {
        type: DataTypes.STRING
    },
    costo: {
        type: DataTypes.DOUBLE
    },
    exedente:{
        type: DataTypes.DOUBLE
    }
},{
    tableName: 'categorias_medidor',
});



export default categoriaMedidor;