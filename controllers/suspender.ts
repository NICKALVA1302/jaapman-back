import { Response, Request } from 'express'
import { Transaction } from "sequelize";
import Usuarios from "../models/usuarios";
import db from "../db/connection";
import Medidores from "../models/medidores";
import Personas from '../models/personas';
import Localidades from '../models/localidades';

//Obtener datos de localidades por usuario en mantenimiento 
export const listadoUsuario = async (req: Request, res: Response) => {

    try {
        const usuarios = await Usuarios.findAll({
            include: [
                {
                    model: Personas,
                    attributes: ['nombre', 'apellido', 'cedula']
                },
                {
                    model: Localidades,
                    attributes: ['id_localidad', 'nombre']
                }
            ]
        });
        res.status(200).json(usuarios);
    } catch (error) {
        console.error("Error al obtener los datos:", error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
};

//Obtener datos de localidades por usuario en mantenimiento 
export const localidadXUsuario = async (req: Request, res: Response) => {
    
    const { id_localidad } = req.body;

    try {
        const usuarios = await Usuarios.findAll({
            where: {
                id_localidad
            }, 
            include: [
                {
                    model: Personas,
                    attributes: ['nombre', 'apellido', 'cedula']
                },
                {
                    model: Localidades,
                    attributes: ['id_localidad', 'nombre']
                }
            ]
        });
        res.status(200).json(usuarios);
    } catch (error) {
        console.error("Error al obtener los datos:", error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
};

export const suspenderUsuario = async (req: Request, res: Response) => {
   
    const idUsuario = req.body.id_usuario; 

    let transaction: Transaction;

    try {
        transaction = await db.transaction();

        // Obtener el usuario por ID
        const usuario = await Usuarios.findByPk(idUsuario, { transaction });

        if (!usuario) {
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }

        // Cambiar el estado del usuario
        const nuevoEstadoUsuario = usuario.id_estado === 1 ? 2 : 1; // Si el estado es 1 (activo), cambiar a 2 (inactivo); de lo contrario, cambiar a 1 (activo)
        await usuario.update({ id_estado: nuevoEstadoUsuario }, { transaction });

        // Obtener el ID del medidor asociado al usuario
        const idMedidor = usuario.id_medidor;

        if (idMedidor) {
            // Cambiar el estado del medidor asociado al usuario
            const medidor = await Medidores.findByPk(idMedidor, { transaction });

            if (!medidor) {
                return res.status(404).json({ error: 'Medidor no encontrado' });
            }

            const nuevoEstadoMedidor = medidor.id_estado_medidor === 1 ? 2 : 1; // Si el estado es 1 (activo), cambiar a 2 (inactivo); de lo contrario, cambiar a 1 (activo)
            await medidor.update({ id_estado_medidor: nuevoEstadoMedidor }, { transaction });
        } else {
            // Si el usuario no tiene un medidor asociado, solo se actualiza el estado del usuario
            console.log('El usuario no tiene un medidor asociado');
        }

        // Confirmar la transacción
        await transaction.commit();

        res.status(200).json({ message: 'Estado del usuario y medidor actualizado correctamente' });
    } catch (error) {
        console.error('Error al cambiar el estado del usuario y medidor:', error);
        if (transaction) {
            await transaction.rollback();
        }
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};