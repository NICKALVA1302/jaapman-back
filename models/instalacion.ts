import { DataTypes } from "sequelize";
import db from "../db/connection";
import PlanillaDetalle from "./planillaDetalle";
import Estado_pago from "./estado_pago";


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
    },
    numero: { // Agregar el campo 'numero'
        type: DataTypes.INTEGER
    }
},{
    tableName: 'instalacion',
});


 //RELACIONES DE TABLAS 
 Instalacion.belongsTo(Estado_pago, {foreignKey : "id_estado_pago"});
 Estado_pago.hasMany(Instalacion, {foreignKey : "id_estado_pago" });

export default Instalacion;