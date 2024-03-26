import { DataTypes } from "sequelize";
import sequelize from "../db/connection";
import { rol } from '../models/rol'; 

export interface UsuarioRolAttributes {
    id_usuario_rol: number;
    id_usuario: number;
    id_rol: number;
}


export const usuario_rol = sequelize.define("usuario_rol", {
    id_usuario_rol: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    id_usuario: {
        type: DataTypes.NUMBER,
    },
    id_rol: {
        type: DataTypes.NUMBER,
    }
}, {
    tableName: 'usuario_rol',
});

usuario_rol.belongsTo(rol, { foreignKey: 'id_rol', as: 'rol' });