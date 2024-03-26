import { Response, Request } from 'express'
import db from '../db/connection';
import Mantenimiento from '../models/mantenimiento';
import Mantenimiento_detalle from '../models/mantenimiento_detalle';
import Material from '../models/material';

import { Sequelize, literal } from 'sequelize';
import Tarifa from '../models/tarifa';
import Personas from '../models/personas';
import Localidades from '../models/localidades';
import Usuarios from '../models/usuarios';
import Medidores from '../models/medidores';


export const getTarifa = async (req: Request, res: Response) => {

    try {
        const listTarifa = await Tarifa.findAll({

          attributes: [
            'id_tarifa',
            'rango',
            'valor'
          ],
        });
    
        res.json(listTarifa);

      } catch (error) {
        console.error('Error al obtener la lista de tarifa:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
      }
    };


//Obtener datos de localidades por usuario en mantenimiento 
export const getLocaxUsuario = async (req: Request, res: Response) => {
    const { id_localidad } = req.body;

    try {
        const LocxUsuario = await Personas.findAll({
            attributes: ["id_persona", "nombre", "apellido", "cedula", "direccion"], // Seleccionar los campos necesarios de la tabla Persona
            include: [
                {
                    model: Usuarios,
                    where: { id_localidad }, // Filtrar por la ID de la localidad
                    include: [
                        {
                            model: Localidades,
                            attributes: ["nombre"] // Seleccionar el nombre de la localidad
                        },
                        {
                            model: Medidores, // Agregar la relación con Medidores
                            attributes: ["id_medidor", "codigo"], // Seleccionar los campos necesarios de Medidores
                            required: true // Cambiar a true si deseas usuarios solo con medidores asignados
                        }
                    ]
                }
            ]
        });

        res.json({
            LocalidadesxUsuario: LocxUsuario,
        });
    } catch (error) {
        console.error("Error al obtener los datos:", error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
};



// Agregar mantenimiento

export const agregarMantenimiento = async (req: Request, res: Response) => {
    try {
        const { id_usuario, id_tarifa, materiales } = req.body;

        // Obtener el valor de la tarifa (o 0 si id_tarifa es null)
        const valorTarifa = id_tarifa
            ? (await Tarifa.findByPk(id_tarifa))?.getDataValue('valor') || 0
            : 0;

        const result = await Mantenimiento.create({
            id_usuario,
            id_tarifa,
            id_estado_pago:2 ,
            total: 0
        });

        const id_mantenimiento = result.getDataValue('id_mantenimiento');

        await db.transaction(async (t) => {
            for (const { id_material, cantidad } of materiales) {
                const material = await Material.findByPk(id_material);

                if (!material) {
                    // Manejar el caso donde no se encuentra el material
                    continue;
                }

                const precioMaterial = material.getDataValue('precio');
                const subtotal = cantidad * precioMaterial;

                await Mantenimiento_detalle.create({
                    id_mantenimiento,
                    id_material,
                    cantidad,
                    subtotal,
                }, { transaction: t });

                // Actualizar el stock del material
                await Material.update({
                    stock: literal(`stock - ${cantidad}`),
                }, {
                    where: { id_material },
                    transaction: t,
                });
            }

            //Actualizar Mantenimiento
            await Mantenimiento.update({
                total: literal(`(SELECT COALESCE(SUM(subtotal), 0) FROM mantenimiento_detalle WHERE id_mantenimiento = ${id_mantenimiento}) + ${valorTarifa}`),
            }, {
                where: { id_mantenimiento },
                transaction: t,
            });
        });

        res.status(201).json({ msg: 'Materiales Vendidos correctamente' });
    } catch (error) {
        console.error('Error al agregar materiales:', error);
        res.status(500).json({ msg: 'Error del servidor al agregar materiales' });
    }
};