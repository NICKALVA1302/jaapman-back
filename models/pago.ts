import { DataTypes } from "sequelize";
import db from "../db/connection";



const Pago = db.define('Pago',{
    id_pago: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    id_planilla: {
        type: DataTypes.INTEGER
    },
    id_instalacion: {
        type: DataTypes.INTEGER
    },
    id_mantenimiento: {
        type: DataTypes.INTEGER
    },
    id_planilla_det: {
        type: DataTypes.INTEGER
    },
    id_tipopago: {
        type: DataTypes.INTEGER
    },
    id_estado_pago : {
        type: DataTypes.INTEGER
    },
    abono_realizado: {
        type: DataTypes.DOUBLE
    }
},{
    tableName: 'pago',
});


export default Pago;