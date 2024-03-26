// medidor.ts
import { DataTypes, Model } from "sequelize";
import db from "../db/connection";
import categoriaMedidor from "./categoria_medidor";

/* export interface MedidorInstance extends Model {
    id_medidor: number;
    id_estado_medidor: number;
    codigo: string;
    createdAt: Date;
    updatedAt: Date;
} */

const Medidores = db.define('medidor',{
    id_medidor: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    id_estado_medidor:{
        type:DataTypes.INTEGER
    },
    id_categoria:{
        type:DataTypes.INTEGER
    },
    id_material:{
        type:DataTypes.INTEGER
    },
    codigo: {
        type: DataTypes.STRING
    }
}, {
    
    //Para que no se coloque automaticamente el createdAt ni el updatedAt
    //timestamps: false
});

Medidores.belongsTo(categoriaMedidor, { foreignKey: 'id_categoria' });

export default Medidores;
