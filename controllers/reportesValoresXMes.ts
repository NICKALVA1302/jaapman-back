import { Response, Request } from 'express';
import db from '../db/connection';

export const valoresGeneradosXMes = async (req: Request, res: Response) => {
    try {
        // Recibir los parámetros de la solicitud HTTP desde el cuerpo
        const { tipo_servicio, fecha_inicio, fecha_fin, localidad } = req.body;

        // Consulta SQL preparada para evitar inyecciones SQL y manejar las entradas de manera segura
        const query = `
            SELECT 
                loc.nombre AS localidad, 
                YEAR(pld.createdAt) AS anio, 
                MONTH(pld.createdAt) AS mes, 
                pld.createdAt AS fecha,
                per.cedula AS cedula,
                CONCAT(per.nombre, ' ', per.apellido) AS cliente, 
                per.direccion AS direccion,
                per.telefono AS telefono,
                per.email AS correo,
                pld.total_pago AS total,
                CASE 
                    WHEN pld.id_planilla IS NOT NULL THEN 'Agua'
                    WHEN pld.id_alcantarillado IS NOT NULL THEN 'Alcantarillado'
                    WHEN pld.id_instalacion IS NOT NULL THEN 'Instalación'
                    WHEN pld.id_mantenimiento IS NOT NULL THEN 'Mantenimiento'
                END AS tipo_de_servicio
            FROM 
                planilla_detalle pld 
            LEFT JOIN planilla pl ON pld.id_planilla = pl.id_planilla 
            LEFT JOIN instalacion inst ON pld.id_instalacion = inst.id_instalacion 
            LEFT JOIN alcantarillado al ON pld.id_alcantarillado = al.id_alcantarillado 
            LEFT JOIN mantenimiento man ON pld.id_mantenimiento = man.id_mantenimiento 
            LEFT JOIN usuario u ON pl.id_usuario = u.id_usuario OR inst.id_usuario = u.id_usuario OR al.id_usuario = u.id_usuario OR man.id_usuario = u.id_usuario 
            LEFT JOIN persona per ON u.id_persona = per.id_persona 
            LEFT JOIN localidad loc ON u.id_localidad = loc.id_localidad 
            WHERE 
                pld.createdAt BETWEEN :fecha_inicio AND :fecha_fin
                AND loc.id_localidad = :localidad
                AND (
                    (:tipo_servicio = 'Agua' AND pld.id_planilla IS NOT NULL) OR
                    (:tipo_servicio = 'Alcantarillado' AND pld.id_alcantarillado IS NOT NULL) OR
                    (:tipo_servicio = 'Instalación' AND pld.id_instalacion IS NOT NULL) OR
                    (:tipo_servicio = 'Mantenimiento' AND pld.id_mantenimiento IS NOT NULL)
                )
            ORDER BY 
                pld.createdAt;
        `;

        // Ejecutar la consulta con los parámetros de la solicitud
        const [result] = await db.query(query, {
            replacements: {
                tipo_servicio,
                fecha_inicio,
                fecha_fin,
                localidad
            }
        });

        // Enviar la respuesta con los datos obtenidos
        res.json(result);
    } catch (error) {
        console.error('Error al obtener el reporte general:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }

    
};
