// medidor.ts
import { DataTypes, Model } from "sequelize";
import db from "../db/connection";
import categoriaMedidor from "./categoria_medidor";

// Define una interfaz para el modelo Medidor
interface MedidorInstance extends Model {
    id_medidor: number;
    id_estado_medidor: number;
    id_categoria: number;
    id_material: number;
    codigo: string;
}

const Medidores = db.define<MedidorInstance>('medidor',{
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
