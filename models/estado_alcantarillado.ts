import { DataTypes } from "sequelize";
import db from "../db/connection";

const Estado_alcantarillado = db.define('Estado_alcantarillado',{
    id_estado_al: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    estado: {
        type: DataTypes.STRING
    }
},{
    tableName: 'estado_alcantarillado',
});


export default Estado_alcantarillado;