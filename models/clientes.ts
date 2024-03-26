import { DataTypes } from "sequelize";
import db from "../db/connection";


const Cliente = db.define('Cliente',{
    id_cliente: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    usuario_crea: {
        type: DataTypes.STRING
    },
    cedula: {
        type: DataTypes.INTEGER
    },
    nombre: {
        type: DataTypes.STRING
    },
    apellido: {
        type: DataTypes.STRING
    },
    direccion: {
        type: DataTypes.STRING
    },
    telefono: {
        type: DataTypes.STRING
    },
    genero: {
        type: DataTypes.STRING
    },
    email: {
        type: DataTypes.STRING
    },
    foto: {
        type: DataTypes.STRING
    },
    estado: {
        type: DataTypes.STRING
    }
},{
    tableName: 'cliente',
});

export default Cliente;