import { Response, Request } from 'express'
import { Transaction } from "sequelize";
import db from "../../../db/connection";
import Alcantarillado from "../../../models/alcantarillado";
import Usuarios from '../../../models/usuarios';
import Personas from '../../../models/personas';
import Localidades from '../../../models/localidades';
import Estado_alcantarillado from '../../../models/estado_alcantarillado';

//Obtener datos de localidades por usuario 
export const localidadXUsuAl = async (req: Request, res: Response) => {
    const { id_localidad } = req.body;

    try {
        const usuarios = await Usuarios.findAll({
            where: {
                id_localidad,
                id_estado: 1 
            }, 
            include: [
                {
                    model: Personas,
                    attributes: ['nombre', 'apellido', 'cedula']
                },
                {
                    model: Localidades,
                    attributes: ['id_localidad', 'nombre']
                },
                {
                    model: Alcantarillado,
                    attributes: ['id_alcantarillado', 'id_usuario', 'id_estado', 'id_tarifa', 'id_estado_pago', 'id_estado_al'],
                    as: 'alcantarillado', // Asegúrate de usar el alias correcto si lo has definido
                    include: [
                        {
                            model: Estado_alcantarillado,
                            attributes: ['id_estado_al', 'estado']
                        }
                    ]
                }
            ]
        });
        res.status(200).json(usuarios);
    } catch (error) {
        console.error("Error al obtener los datos:", error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
};

export const inscribirCliente = async (req: Request, res: Response) => {
    const { id_usuario } = req.body;

    const id_estado = 1;
    const id_tarifa = 1;
    const id_estado_pago = 2;
    const id_estado_al_inscrito = 1; // ID para "inscrito"
    const id_estado_al_no_inscrito = 2; // ID para "no inscrito"

    let transaction: Transaction;

    try {
        transaction = await db.transaction();

        // Verificar si el usuario ya existe en alcantarillado
        const usuarioExistente = await Alcantarillado.findOne({ where: { id_usuario }, transaction });

        if (usuarioExistente) {
            // Si el usuario ya está inscrito, alternar el estado
            const nuevoEstadoAl = usuarioExistente.id_estado_al === id_estado_al_inscrito
                ? id_estado_al_no_inscrito
                : id_estado_al_inscrito;

            // Actualizar el estado del usuario
            await usuarioExistente.update({ id_estado_al: nuevoEstadoAl }, { transaction });

            const mensaje = nuevoEstadoAl === id_estado_al_inscrito 
                ? 'Cliente re-inscrito correctamente' 
                : 'Cliente actualizado a "no inscrito" correctamente';

            res.status(200).json({ message: mensaje });
        } else {
            // Si el usuario no está inscrito, agregarlo con el estado "inscrito"
            await Alcantarillado.create({
                id_usuario,
                id_estado,
                id_tarifa,
                id_estado_pago,
                id_estado_al: id_estado_al_inscrito
            }, { transaction });

            res.status(200).json({ message: 'Cliente inscrito correctamente' });
        }

        // Confirmar la transacción
        await transaction.commit();
    } catch (error) {
        console.error('Error al inscribir cliente:', error);
        if (transaction) {
            await transaction.rollback();
        }
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};


// export const inscribirCliente = async (req: Request, res: Response) => {

//     const { id_usuario } = req.body;
    
//     const id_estado = 1;
//     const id_tarifa = 1;
//     const id_estado_pago = 2;
//     const id_estado_al = 1;

//     let transaction: Transaction;

//     try {
//         transaction = await db.transaction();

//         // Verificar si el usuario ya existe en alcantarillado
//         const usuarioExistente = await Alcantarillado.findOne({ where: { id_usuario }, transaction });

//         if (usuarioExistente) {
//             // Si el usuario ya está inscrito, eliminarlo
//             await Alcantarillado.destroy({ where: { id_usuario }, transaction });
//             res.status(200).json({ message: 'Cliente eliminado correctamente' });
//         } else {
//             // Si el usuario no está inscrito, agregarlo
//             await Alcantarillado.create({ id_usuario, id_estado, id_tarifa, id_estado_pago, id_estado_al }, { transaction });
//             res.status(200).json({ message: 'Cliente inscrito correctamente' });
//         }

//         // Confirmar la transacción
//         await transaction.commit();
//     } catch (error) {
//         console.error('Error al inscribir cliente:', error);
//         if (transaction) {
//             await transaction.rollback();
//         }
//         res.status(500).json({ error: 'Error interno del servidor' });
//     }
// };