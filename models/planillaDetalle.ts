import { DataTypes } from "sequelize";
import db from "../db/connection";
import Mantenimiento from "./mantenimiento";
import Planillas from "./planillas";
import Alcantarillado from "./alcantarillado";
import Instalacion from "./instalacion";



const PlanillaDetalle = db.define('PlanillaDetalle',{
    id_planilla_det: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    id_planilla: {
        type: DataTypes.INTEGER
    },
    id_alcantarillado: {
        type: DataTypes.INTEGER
    },
    id_instalacion: {
        type: DataTypes.INTEGER
    },
    id_mantenimiento: {
        type: DataTypes.INTEGER
    },
    id_estado: {
        type: DataTypes.INTEGER
    },
    total_pago:{
        type: DataTypes.DOUBLE
    },
    deuda_pendiente:{
        type: DataTypes.DOUBLE
    },
    descripcion:{
        type: DataTypes.STRING
    }
},{
    tableName: 'planilla_detalle',
});

PlanillaDetalle.belongsTo(Mantenimiento, { foreignKey: 'id_mantenimiento' }); // Configura la asociación con Mantenimiento

PlanillaDetalle.belongsTo(Alcantarillado, { foreignKey: 'id_alcantarillado' });

PlanillaDetalle.belongsTo(Instalacion, { foreignKey: 'id_instalacion' });



export default PlanillaDetalle;