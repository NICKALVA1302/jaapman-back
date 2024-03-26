import { DataTypes } from "sequelize";
import db from "../db/connection";
import Tarifa from "./tarifa";
import PlanillaDetalle from "./planillaDetalle";



const Alcantarillado = db.define('Alcantarillado',{
    id_alcantarillado: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    id_usuario: {
        type:DataTypes.INTEGER
    },
    id_estado: {
        type: DataTypes.INTEGER
    },
    id_tarifa: {
        type: DataTypes.INTEGER
    },
    id_estado_pago:{
        type: DataTypes.INTEGER
    },
    inscrito: {
        type: DataTypes.STRING
    }
},{
    tableName: 'alcantarillado',
});

Alcantarillado.belongsTo(Tarifa, { foreignKey: 'id_tarifa' });


export default Alcantarillado;