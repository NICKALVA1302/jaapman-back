import { DataTypes } from "sequelize";
import db from "../db/connection";
import PlanillaDetalle from "./planillaDetalle";



const Mantenimiento = db.define('Mantenimiento',{
    id_mantenimiento: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    id_usuario: {
        type: DataTypes.INTEGER
    },
    id_tarifa: {
        type: DataTypes.INTEGER
    },
    id_estado_pago:{
        type: DataTypes.INTEGER
    },
    total: {
        type: DataTypes.DOUBLE
    }
},{
    tableName: 'mantenimiento',
});


export default Mantenimiento;