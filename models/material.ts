import { DataTypes } from 'sequelize';
import db from '../db/connection'
import Estado from './estado';



const Material = db.define('material', {

    id_material: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },

    id_estado: {
        type: DataTypes.INTEGER
    },

    nombre: {
        type: DataTypes.STRING
    },

    descripcion: {
        type: DataTypes.STRING
    },

    stock: {
        type: DataTypes.INTEGER
    },

    precio: {
        type: DataTypes.DOUBLE
    }
 }, {
 tableName: 'material'
 }
 )

 //RELACIONES DE TABLAS 
Material.belongsTo(Estado, {foreignKey : "id_estado"});
Estado.hasMany(Material, {foreignKey : "id_estado" });
 

 //, {
//     // createdAt: false,
//     // updatedAt: false,
//     // tableName: 'Materiales' // DEfinir nombre de la base de Datos
//     // // timestamps: true
// })

export default Material;