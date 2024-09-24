import { DataTypes, Model } from 'sequelize';
import db from '../db/connection';
import Estado from './estado';
import Tarifa from './tarifa';
import Estado_pago from './estado_pago';
import Estado_alcantarillado from './estado_alcantarillado';

// Define la interfaz para los atributos del modelo
interface AlcantarilladoAttributes {
    id_alcantarillado: number;
    id_usuario: number;
    id_estado: number;
    id_tarifa: number;
    id_estado_pago: number;
    id_estado_al: number;
}

// Define la clase del modelo extendiendo Model
class Alcantarillado extends Model<AlcantarilladoAttributes> implements AlcantarilladoAttributes {
    public id_alcantarillado!: number;
    public id_usuario!: number;
    public id_estado!: number;
    public id_tarifa!: number;
    public id_estado_pago!: number;
    public id_estado_al!: number;
}

Alcantarillado.init({
    id_alcantarillado: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    id_usuario: {
        type: DataTypes.INTEGER
    },
    id_estado: {
        type: DataTypes.INTEGER
    },
    id_tarifa: {
        type: DataTypes.INTEGER
    },
    id_estado_pago: {
        type: DataTypes.INTEGER
    },
    id_estado_al: {
        type: DataTypes.INTEGER
    }
}, {
    sequelize: db,
    tableName: 'alcantarillado',
});

// Establecer las relaciones
Alcantarillado.belongsTo(Estado, { foreignKey: 'id_estado', as: 'estado' });
Estado.hasMany(Alcantarillado, { foreignKey: 'id_estado' });

Alcantarillado.belongsTo(Tarifa, { foreignKey: 'id_tarifa', as: 'tarifa' });
Tarifa.hasMany(Alcantarillado, { foreignKey: 'id_tarifa' });

Alcantarillado.belongsTo(Estado_pago, { foreignKey: 'id_estado_pago', as: 'estado_pago' });
Estado_pago.hasMany(Alcantarillado, { foreignKey: 'id_estado_pago' });

Alcantarillado.belongsTo(Estado_alcantarillado, { foreignKey: 'id_estado_al' });
Estado_alcantarillado.hasMany(Alcantarillado, { foreignKey: 'id_estado_al' });

export default Alcantarillado;