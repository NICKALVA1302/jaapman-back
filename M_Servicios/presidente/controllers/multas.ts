import { Response, Request } from 'express';
import Multa from '../../../models/multas';
import db from '../../../db/connection';
import { QueryTypes } from 'sequelize';
import Localidades from '../../../models/localidades';
import Personas from '../../../models/personas';
import Usuarios from '../../../models/usuarios';

export const agregarMulta = async (req: Request, res: Response) => {
    try {
        const { id_usuario, valor_multa, observacion } = req.body;

        // Iniciar transacción
        await db.transaction(async (t) => {
            
            // Insertar la nueva multa dentro de la transacción
            await Multa.create({ id_usuario, valor_multa, observacion }, { transaction: t });
        });

        // Respuesta si la transacción tiene éxito
        res.status(201).json({ msg: 'Multa agregada correctamente' });
    } catch (error) {
        // Manejar errores y enviar una respuesta de error al cliente
        console.error('Error al agregar la multa:', error);
        res.status(500).json({ msg: 'Error interno del servidor al agregar la multa' });
    }
};

export const listadoMultas = async (req: Request, res: Response) => {
    try {
        const multas = await Multa.findAll({
            include: [
                {
                    model: Usuarios,
                    include: [
                        {
                            model: Personas,
                            attributes: ['nombre', 'apellido']
                        },
                        {
                            model: Localidades,
                            attributes: ['nombre']
                        }
                    ]
                }
            ]
        });
        res.status(200).json(multas);
    } catch (error) {
        console.error('Error al obtener las multas:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

export const eliminarMulta = async (req: Request, res: Response) => {
    try {
        const { id_multa } = req.params;

        // Eliminar la multa utilizando Sequelize
        const resultado = await Multa.destroy({
            where: {
                id_multa: id_multa,
            },
        });

        if (resultado === 1) {
            res.status(200).json({ msg: 'Multa eliminada correctamente' });
        } else {
            res.status(404).json({ msg: 'Multa no encontrada' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Error interno del servidor' });
    }
};

export const actualizarMulta = async (req: Request, res: Response) => {
    try {
        // Desestructurar el id de la multa
        const { id_multa } = req.params;

        // Desestructurar los datos de la solicitud
        const { valor_multa, observacion } = req.body;

        // Actualizar la multa utilizando Sequelize
        const resultado = await Multa.update(
            {
                valor_multa,
                observacion
            },
            {
                where: {
                    id_multa: id_multa
                }
            }
        );

        // Verificar si se actualizó correctamente
        if (resultado[0] === 1) {
            res.status(200).json({ msg: 'Multa actualizada correctamente' });
        } else {
            res.status(404).json({ msg: 'Multa no encontrada' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Error interno del servidor' });
    }
};

export const obtenerMultaXId = async (req: Request, res: Response) => {
    try {
        const { id_multa } = req.params;

        const multa = await Multa.findByPk(id_multa, {
            include: [
                {
                    model: Usuarios,
                    include: [
                        {
                            model: Personas,
                            attributes: ['nombre', 'apellido']
                        },
                        {
                            model: Localidades,
                            attributes: ['nombre']
                        }
                    ]
                }
            ]
        });

        if (multa) {
            res.status(200).json(multa);
        } else {
            res.status(404).json({ msg: 'Multa no encontrada' });
        }
    } catch (error) {
        console.error('Error al obtener la multa por ID:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};