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
        lectura_anterior:{
            type:DataTypes.STRING
        },
        lectura_actual:{
            type:DataTypes.STRING   
        },
        consumo_total:{
            type:DataTypes.STRING
        },
        estado_lectura:{
            type:DataTypes.STRING
        },
        nom_resp_edit:{
            type:DataTypes.STRING
        },
        
        total_pagar:{
            type:DataTypes.STRING
        },
        observaciones:{
            type:DataTypes.STRING
        }
        });

        Planillas.hasMany(PlanillaDetalle, { foreignKey: 'id_planilla' });

        export default Planillas;