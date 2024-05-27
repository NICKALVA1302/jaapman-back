import { DataTypes } from "sequelize";
import db from "../db/connection";
import PlanillaDetalle from "./planillaDetalle";
import Tarifa from "./tarifa";
import Usuarios from "./usuarios";
import Estado_pago from "./estado_pago";



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

//Relaciones

Mantenimiento.belongsTo(Tarifa, {foreignKey: 'id_tarifa'});
Tarifa.hasMany(Mantenimiento, {foreignKey: 'id_usuario'});

// Mantenimiento.hasMany(Usuarios, {foreignKey: 'id_usuario'});
// Usuarios.belongsTo(Mantenimiento, {foreignKey: 'id_usuario'});

Mantenimiento.belongsTo(Estado_pago, { foreignKey: 'id_estado_pago' });
Estado_pago.hasMany(Mantenimiento, { foreignKey: 'id_estado_pago' });

export default Mantenimiento;