import { Response, Request } from 'express';
import db from '../db/connection';

export const obtenerReporteAguaporDia = async (req: Request, res: Response) => {
    try {
        // Recibir los parámetros de la solicitud HTTP
        const { fechaDia, localidad } = req.body;

        // Consulta SQL
        const query = `
            SELECT 
                l.nombre AS localidad, 
                p.createdAt AS fecha, 
                CONCAT(per.nombre, ' ', per.apellido) AS cliente, 
                pd.total_pago 
            FROM 
                planilla_detalle pd 
            JOIN planilla p ON pd.id_planilla = p.id_planilla 
            JOIN usuario u ON p.id_usuario = u.id_usuario 
            JOIN persona per ON u.id_persona = per.id_persona 
            JOIN localidad l ON u.id_localidad = l.id_localidad 
            WHERE 
                DATE(p.createdAt) = :fechaDia 
                AND l.id_localidad = :localidad;
        `;

        // Ejecutar la consulta
        const [reporte] = await db.query(query, {
            replacements: {
                fechaDia,
                localidad
            },
            
        });

        // Enviar la respuesta con los datos obtenidos
        res.json(reporte);
    } catch (error) {
        console.error('Error al obtener el reporte:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

export const obtenerReporteAguaporMes = async (req: Request, res: Response) => {
    try {
        // Recibir los parámetros de la solicitud HTTP
        const { fechaMes, localidad } = req.body;

        // Consulta SQL
        const query = `
            SELECT
                l.nombre AS localidad,
                DATE(p.createdAt) AS fecha,
                SUM(pd.total_pago) AS recaudacion_total
            FROM
                planilla_detalle pd
            JOIN planilla p ON
                pd.id_planilla = p.id_planilla
            JOIN usuario u ON
                p.id_usuario = u.id_usuario
            JOIN localidad l ON
                u.id_localidad = l.id_localidad
            WHERE
                DATE_FORMAT(p.createdAt, '%Y-%m') = :fechaMes AND l.id_localidad = :localidad
            GROUP BY
                DATE(p.createdAt);

        `;

        // Ejecutar la consulta
        const [reporte] = await db.query(query, {
            replacements: {
                fechaMes,
                localidad
            },
            
        });

        // Enviar la respuesta con los datos obtenidos
        res.json(reporte);
    } catch (error) {
        console.error('Error al obtener el reporte:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

export const obtenerReporteAguaporAnio = async (req: Request, res: Response) => {
    try {
        // Recibir los parámetros de la solicitud HTTP
        const { fechaAnio, localidad } = req.body;

        // Consulta SQL
        const query = `
            SELECT
                l.nombre AS localidad,
                DATE_FORMAT(p.createdAt, '%Y-%m') AS mes,
                SUM(pd.total_pago) AS recaudacion_total
            FROM
                planilla_detalle pd
            JOIN planilla p ON
                pd.id_planilla = p.id_planilla
            JOIN usuario u ON
                p.id_usuario = u.id_usuario
            JOIN localidad l ON
                u.id_localidad = l.id_localidad
            WHERE
                DATE_FORMAT(p.createdAt, '%Y') = :fechaAnio AND l.id_localidad = :localidad
            GROUP BY
                DATE_FORMAT(p.createdAt, '%Y-%m');

        `;

        // Ejecutar la consulta
        const [reporte] = await db.query(query, {
            replacements: {
                fechaAnio,
                localidad
            },
            
        });

        // Enviar la respuesta con los datos obtenidos
        res.json(reporte);
    } catch (error) {
        console.error('Error al obtener el reporte:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};
