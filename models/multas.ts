import { DataTypes } from "sequelize";
import db from "../db/connection";
import Usuarios from "./usuarios";


const Multa = db.define('multas', {
    id_multa: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    id_usuario: {
        type: DataTypes.INTEGER,

    },
    valor_multa:{
        type: DataTypes.DOUBLE
    },
    observacion: {
        type: DataTypes.TEXT
    }
},{
    tableName: 'multas'
});

Multa.belongsTo(Usuarios, { foreignKey: 'id_usuario' });

export default Multa;