import { DataTypes } from 'sequelize';
import db from "../db/connection";
import Material from './material';
import Mantenimiento from './mantenimiento';

const Mantenimiento_detalle = db.define('mantenimiento_detalle', {
    
    id_mantenimiento_detalle: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },

    id_mantenimiento: {
        type: DataTypes.INTEGER
    },

    id_material: {
        type: DataTypes.INTEGER
    },

    cantidad: {
        type: DataTypes.INTEGER
    },

    subtotal: {
        type: DataTypes.DOUBLE
    }

}, {
    tableName: 'mantenimiento_detalle'
});

//Relaciones

Mantenimiento_detalle.belongsTo(Material, {foreignKey: "id_material"});
Material.hasMany(Mantenimiento_detalle, {foreignKey: "id_material"});

Mantenimiento_detalle.belongsTo(Mantenimiento, {foreignKey: "id_mantenimiento"});
Mantenimiento.hasMany(Mantenimiento_detalle, {foreignKey: "id_mantenimiento"});


export default Mantenimiento_detalle;