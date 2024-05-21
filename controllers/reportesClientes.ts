import { Response, Request } from 'express';
import db from '../db/connection';

// Importar los modelos necesarios
import Personas from '../models/personas';
import Localidades from '../models/localidades';
import Usuarios from '../models/usuarios';
import Medidores from '../models/medidores';

export const obtenerClientesSuspendidos = async (req: Request, res: Response) => {
    try {
        // Recibir el parámetro de la localidad desde la solicitud HTTP
        const { id_localidad } = req.body;

        // Consulta SQL para obtener los clientes suspendidos filtrados por localidad
        const query = `
            SELECT 
                persona.nombre AS Nombre,
                persona.apellido AS Apellido,
                persona.cedula AS Cedula,
                localidad.nombre AS Localidad,
                persona.direccion AS Direccion,
                persona.telefono AS Telefono
            FROM 
                usuario
            JOIN 
                persona ON usuario.id_persona = persona.id_persona
            JOIN 
                localidad ON usuario.id_localidad = localidad.id_localidad
            WHERE 
                usuario.id_estado = (SELECT id_estado FROM estado WHERE nombre = 'INACTIVO')
                AND localidad.id_localidad = ${id_localidad}; -- Utilizar el parámetro de la localidad
        `;

       // Ejecutar la consulta
       const [clientesSuspendidos] = await db.query(query);

       // Enviar la respuesta con los datos obtenidos (array plano)
       res.json(clientesSuspendidos);
   } catch (error) {
       console.error('Error al obtener clientes suspendidos:', error);
       res.status(500).json({ error: 'Error interno del servidor' });
   }
};

export const obtenerClientesPorLocalidad = async (req: Request, res: Response) => {
    try {
        // Recibir el parámetro de la localidad desde la solicitud HTTP
        const { id_localidad } = req.body;

        // Consulta SQL para obtener los clientes filtrados por localidad
        const query = `
            SELECT 
            p.nombre AS Nombre,
                p.apellido AS Apellido,
                p.cedula AS Cedula,
                l.nombre AS Localidad,
                p.direccion AS Direccion,
                p.telefono AS Telefono
            FROM persona p
            JOIN usuario u ON p.id_persona = u.id_persona
            JOIN localidad l ON u.id_localidad = l.id_localidad
            WHERE l.id_localidad = ${id_localidad};
        `;
        // Ejecutar la consulta con el nombre de la localidad como parámetro
        const [clientesPorLocalidad] = await db.query(query);
        // Enviar la respuesta con los datos obtenidos
        res.json(clientesPorLocalidad);
    } catch (error) {
        console.error('Error al obtener clientes por localidad:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};