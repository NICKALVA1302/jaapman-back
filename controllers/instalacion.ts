import { Response, Request } from 'express'
import db from '../db/connection';
import Instalacion from '../models/instalacion';
import Personas from '../models/personas';
import Localidades from '../models/localidades';
import Usuarios from '../models/usuarios';
import Medidores from '../models/medidores';

export const borrarInstalacionPorNumero = async (req: Request, res: Response) => {
    const { numero } = req.params; // Obtener el número de instalación de los parámetros de la URL

    try {
        // Verificar si existe una instalación con el número proporcionado
        const instalacion = await Instalacion.findOne({ where: { numero } });

        if (!instalacion) {
            return res.status(404).json({ error: 'La instalación no existe' });
        }

        // Eliminar la instalación con el número proporcionado
        await Instalacion.destroy({ where: { numero } });

        res.json({ mensaje: 'Instalación eliminada correctamente' });
    } catch (error) {
        console.error("Error al eliminar la instalación:", error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
};

// Función para editar una instalación por su número
export const editarInstalacionPorNumero = async (req: Request, res: Response) => {
    const { numero } = req.body; // Obtener el número de instalación de la solicitud

    try {
        // Verificar si existe una instalación con el número proporcionado
        const instalacion = await Instalacion.findOne({ where: { numero } });

        if (!instalacion) {
            return res.status(404).json({ error: 'La instalación no existe' });
        }

        // Actualizar el valor y el estado de pago de la instalación
        const { valor, id_estado_pago } = req.body;
        await Instalacion.update({ valor, id_estado_pago }, { where: { numero } });

        res.json({ mensaje: 'Instalación actualizada correctamente' });
    } catch (error) {
        console.error("Error al editar la instalación:", error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
};

export const getInstalacionesPorUsuario = async (req: Request, res: Response) => {
    const { id_usuario } = req.body; // Obtener el ID del usuario seleccionado del cuerpo de la solicitud

    try {
        // Buscar las instalaciones asociadas al usuario seleccionado
        const instalaciones = await Instalacion.findAll({
            where: { id_usuario }, // Filtrar por el ID del usuario
            attributes: ['numero', 'valor', 'id_estado_pago'], // Seleccionar los atributos deseados
        });

        res.json(instalaciones); // Enviar las instalaciones encontradas como respuesta
    } catch (error) {
        console.error("Error al obtener las instalaciones:", error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
};


export const obtenerUltimoNumeroInstalacion = async (req: Request, res: Response) => {
    try {
        // Consultar la base de datos para obtener el último número de instalación
        const ultimoNumeroInstalacion: number | null = await Instalacion.max('numero', { raw: true, });

        // Verificar si se encontró algún número de instalación
        if (ultimoNumeroInstalacion !== null) {
            // Enviar el último número de instalación como respuesta al frontend
            res.json({ ultimoNumeroInstalacion });
        } else {
            // Si no se encontró ningún número de instalación, devolver un valor predeterminado o manejar el caso de manera adecuada
            res.status(404).json({ msg: 'No se encontró ningún número de instalación.' });
        }
    } catch (error) {
        console.error('Error al obtener el último número de instalación:', error);
        res.status(500).json({ msg: 'Error del servidor al obtener el último número de instalación' });
    }
};

//Obtener datos de localidades por usuario en instalacion 
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


// Agregar instalacion
export const agregarInstalacion = async (req: Request, res: Response) => {
    try {
        const { id_usuario, id_estado_pago, valor, numero } = req.body;

        // Validar que los campos requeridos no estén vacíos y que el valor sea un número
        if (!id_usuario || !id_estado_pago || !valor || !numero || isNaN(valor) || isNaN(numero)) {
            return res.status(400).json({ msg: 'Por favor, ingrese datos válidos para la instalación.' });
        }

        // Lógica para agregar la instalación en la base de datos
        const result = await Instalacion.create({
            id_usuario,
            id_estado_pago,
            valor,
            numero
        });

        res.status(201).json({ msg: 'Instalación agregada correctamente' });
    } catch (error) {
        console.error('Error al agregar instalación:', error);
        res.status(500).json({ msg: 'Error del servidor al agregar instalación' });
    }
};

//metodo get
/* export const getInstalacionesPorUsuario = async (req: Request, res: Response) => {
    const { id_usuario } = req.query; // Obtener el ID del usuario seleccionado del query string

    try {
        // Buscar las instalaciones asociadas al usuario seleccionado
        const instalaciones = await Instalacion.findAll({
            where: { id_usuario }, // Filtrar por el ID del usuario
            attributes: ['numero', 'valor', 'id_estado_pago'], // Seleccionar los atributos deseados
        });

        res.json(instalaciones); // Enviar las instalaciones encontradas como respuesta
    } catch (error) {
        console.error("Error al obtener las instalaciones:", error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
}; */
