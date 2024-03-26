import { DataTypes } from "sequelize";
import db from "../db/connection";
import PlanillaDetalle from "./planillaDetalle";


const Instalacion = db.define('Instalacion',{
    id_instalacion: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    id_usuario: {
        type: DataTypes.INTEGER
    },
    id_estado_pago:{
        type:DataTypes.INTEGER
    },
    valor: {
        type: DataTypes.DOUBLE
    }
},{
    tableName: 'instalacion',
});



export default Instalacion;