import { Response, Request } from 'express'
import Material from '../../../models/material'
import Estado from '../../../models/estado';
import db from '../../../db/connection';
import Usuarios from '../../../models/usuarios';
import Personas from '../../../models/personas';
import Localidades from '../../../models/localidades';
import Mantenimiento from '../../../models/mantenimiento';
import Mantenimiento_detalle from '../../../models/mantenimiento_detalle';
import Tarifa from '../../../models/tarifa';
import Estado_pago from '../../../models/estado_pago';
import Medidores from '../../../models/medidores';


//Api de todo los Materiales
export const getMaterialxEstado = async (req: Request, res: Response) => {

    try {
        const listaMateriales = await Material.findAll({

            attributes: [
                'id_material',
                'id_estado',
                [db.literal('(SELECT nombre FROM estado WHERE estado.id_estado = material.id_estado)'), 'estado'],
                'nombre',
                'descripcion',
                'stock',
                'precio'
            ],
        });

        res.json(listaMateriales);

    } catch (error) {
        console.error('Error al obtener la lista de materiales:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};


//Buscar por id
export const getMateriales = async (req: Request, res: Response) => {

    try {
        // Desestructurar el id
        const { id_material } = req.params;

        // Buscar material por id con asociación al estado
        const material = await Material.findOne({

            attributes: ['id_material', 'id_estado', 'nombre', 'descripcion', 'stock', 'precio'],

            where: { id_material },

        });

        if (material) {
            res.json(material);
        } else {
            res.status(404).json({
                msg: `No existe un Material con el id ${id_material}`,
            });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Error interno del servidor' });
    }
};

//Agregar Material
export const postMaterial = async (req: Request, res: Response) => {

    try {
        // Obtener los datos del material desde el cuerpo de la solicitud
        const { id_estado, nombre, descripcion, stock, precio } = req.body;

        // Crear un nuevo material con el id_estado proporcionado
        const nuevoMaterial = await Material.create({
            id_estado,
            nombre,
            descripcion,
            stock,
            precio
        });

        // Enviar la respuesta JSON con el nuevo material creado
        res.status(201).json(nuevoMaterial);

    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Error interno del servidor' });
    }
};

//Actualizar Material
export const putMaterial = async (req: Request, res: Response) => {

    try {

        //Desestrocturar el id
        const { id_material } = req.params;

        const { id_estado, nombre, descripcion, stock, precio } = req.body;

        // Actualizar el material utilizando Sequelize
        const resultado = await Material.update(
            {
                id_estado,
                nombre,
                descripcion,
                stock,
                precio
            },
            {
                where: {
                    id_material: id_material,
                },
            }
        );

        if (resultado[0] === 1) {
            res.status(200).json({ msg: 'Material actualizado correctamente' });
        } else {
            res.status(404).json({ msg: `Material no encontrado` });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Error interno del servidor' });
    }
};

//Eliminar Material
export const deleteMaterial = async (req: Request, res: Response) => {

    try {
        const { id_material } = req.params;

        // Eliminar el material utilizando Sequelize
        const resultado = await Material.destroy({

            where: {
                id_material: id_material,
            },
        });

        if (resultado === 1) {
            res.status(200).json({ msg: 'Material eliminado correctamente' });
        } else {
            res.status(404).json({ msg: 'Material no encontrado' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Error interno del servidor' });
    }
};

export const localidadXUsua = async (req: Request, res: Response) => {
    
    const { id_localidad } = req.body;

    try {
        // Busca los usuarios con la id_localidad especificada
        const usuarios = await Usuarios.findAll({
            where: {
                id_localidad
            },
            include: [
                {
                    model: Personas, // Nombre correcto del modelo de asociación
                    attributes: ['nombre', 'apellido', 'cedula', 'direccion']
                },
                {
                    model: Localidades, // Nombre correcto del modelo de asociación
                    attributes: ['id_localidad', 'nombre']
                },
                {
                    model: Mantenimiento, // Nombre correcto del modelo de asociación
                    attributes: ['total'],
                    include: [
                        {
                            model: Mantenimiento_detalle,
                            attributes: ['cantidad', 'subtotal'],
                            include: [
                                {
                                    model: Material,
                                    attributes: ['nombre', 'precio']
                                }
                            ]
                        },
                        {
                            model: Tarifa,
                            attributes: ['valor']
                        },
                        {
                            model: Estado_pago,
                            attributes: ['nombre']
                        }
                    ]
                },
                {
                    model: Medidores,
                    attributes: ['codigo'] // Incluir el código del medidor
                }
            ]
        });

        // Mapear y modificar los usuarios
        const modifiedUsuarios = usuarios.map(usuario => {
            const medidores = usuario.getDataValue('medidor'); // Acceder a la relación medidor usando getDataValue

            if (!medidores) {
                // Si no hay medidor asociado, asignar "No asignado"
                return {
                    ...usuario.toJSON(),
                    medidor: { codigo: "No asignado" }
                };
            } else {
                return usuario;
            }
        });

        res.status(200).json(modifiedUsuarios);
    } catch (error) {
        console.error("Error al obtener los datos:", error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
};

