// usuario.ts
import { DataTypes, Model } from "sequelize";
import db from "../db/connection";
import Personas from "./personas";
import Localidades from "./localidades";
import ResponsableLecturas from "./responsable_lecturas";
import Medidores from "./medidores";
import Planillas from "./planillas";
import { login } from "./login";
import Instalacion from "./instalacion";
import Mantenimiento from "./mantenimiento";

// Define una interfaz para el modelo Usuarios
interface UsuarioInstance extends Model {
    id_usuario: number;
    id_persona: number;
    id_localidad: number;
    id_medidor: number | null; // El medidor puede ser nulo
    id_estado: number;
    id_login: number;
}

const Usuarios = db.define<UsuarioInstance>('usuario', {
    id_usuario: { 
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true/* ,
        field: 'id_usuario'  */
    },
    id_persona:{
        type: DataTypes.INTEGER
    },
    id_localidad: {
        type: DataTypes.INTEGER
    },
    id_medidor: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    id_estado:{
        type:DataTypes.INTEGER
    },
    id_login:{
        type:DataTypes.INTEGER,
        references: {
            model: login,
            key: 'id_login',
        }
    }
    });
    
    /* RELACIONES CON OTRAS TABLAS */
    Usuarios.belongsTo(Personas, {foreignKey : "id_persona"});
    Personas.hasMany(Usuarios,{foreignKey : "id_persona"});
    
    Usuarios.belongsTo(Localidades, {foreignKey : "id_localidad"});
    Localidades.hasMany(Usuarios,{foreignKey : "id_localidad"});
    
    Usuarios.belongsTo(ResponsableLecturas, {foreignKey : "id_usuario"});
    ResponsableLecturas.hasMany(Usuarios,{foreignKey : "id_usuario"});
    
    Usuarios.belongsTo(Medidores, { foreignKey: 'id_medidor' });
    Medidores.hasMany(Usuarios,{foreignKey : "id_medidor"});

    Planillas.belongsTo(Usuarios, {foreignKey : "id_usuario"});
    Usuarios.hasMany(Planillas,{foreignKey : "id_usuario"});
    
    Usuarios.belongsTo(login, { foreignKey: 'id_login', as: 'userLogin' });
    

    Usuarios.hasOne(Instalacion, { foreignKey: 'id_usuario' });

    Usuarios.hasMany(Mantenimiento, { foreignKey: 'id_usuario' }); // Un usuario puede tener muchos mantenimientos
    
    export default Usuarios;
