import { DataTypes } from "sequelize";
import sequelize from "../db/connection";

export const rol = sequelize.define("rol", {
    id_rol: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    id_estado: {
        type: DataTypes.NUMBER,
    },
    nombre: {
        type: DataTypes.STRING,
    },
    descripcion: {
        type: DataTypes.STRING,
    }
}, {
    tableName: 'rol',
});

