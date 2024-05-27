import { DataTypes } from "sequelize";
import db from "../db/connection";
import PlanillaDetalle from "./planillaDetalle";


const Planillas = db.define('planilla', {
    id_planilla: { 
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true/* ,
        field: 'id_usuario'  */
    },
    id_usuario:{
        type: DataTypes.INTEGER
    },
    id_multa: {
        type: DataTypes.INTEGER
    },
    id_responsable_lectura:{
        type:DataTypes.INTEGER
    },
    id_estado_pago:{
        type:DataTypes.INTEGER,
    },
    id_estado:{
        type:DataTypes.INTEGER
    },
    id_descuento:{
        type:DataTypes.INTEGER
    },
    id_apertura:{
        type:DataTypes.INTEGER
    },
    lectura_anterior:{
        type:DataTypes.INTEGER
    },
    lectura_actual:{
        type:DataTypes.INTEGER   
    },
    consumo_total:{
        type:DataTypes.INTEGER
    },
    estado_lectura:{
        type:DataTypes.INTEGER
    },
    nom_resp_edit:{
        type:DataTypes.STRING
    },
    
    total_pagar:{
        type:DataTypes.STRING
    },
    observaciones:{
        type:DataTypes.STRING
    },
    observacion_presidente:{
        type:DataTypes.STRING
    }
    });

    Planillas.hasMany(PlanillaDetalle, { foreignKey: 'id_planilla' });

    export default Planillas;