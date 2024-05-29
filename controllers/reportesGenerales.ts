import { Response, Request } from 'express';
import db from '../db/connection';

export const obtenerReporteCarteraVA = async (req: Request, res: Response) => {
    try {
        // Recibir los parámetros de la solicitud HTTP
        const { tipo_servicio, fecha_inicio, fecha_fin, localidad } = req.body;

        // Consulta SQL
        const query = `
            SELECT 
                loc.nombre AS localidad, 
                YEAR(pld.createdAt) AS anio, 
                MONTH(pld.createdAt) AS mes, 
                SUM(CASE WHEN pl.id_descuento IS NOT NULL THEN pld.total_pago ELSE 0 END) AS total_con_descuento, 
                SUM(CASE WHEN pl.id_descuento IS NULL THEN pld.total_pago ELSE 0 END) AS total_sin_descuento, 
                SUM(pld.total_pago) AS total_facturado, 
                SUM(CASE WHEN ep.nombre = 'PENDIENTE' THEN pld.total_pago ELSE 0 END) AS total_por_facturar, 
                CASE 
                    WHEN pld.id_planilla IS NOT NULL THEN 'Agua' 
                    WHEN pld.id_alcantarillado IS NOT NULL THEN 'Alcantarillado' 
                    WHEN pld.id_instalacion IS NOT NULL THEN 'Instalación' 
                    WHEN pld.id_mantenimiento IS NOT NULL THEN 'Mantenimiento'
                END AS tipo_de_servicio 
            FROM 
                planilla_detalle pld 
            LEFT JOIN 
                planilla pl ON pld.id_planilla = pl.id_planilla 
            LEFT JOIN 
                instalacion inst ON pld.id_instalacion = inst.id_instalacion 
            LEFT JOIN 
                alcantarillado al ON pld.id_alcantarillado = al.id_alcantarillado 
            LEFT JOIN 
                mantenimiento man ON pld.id_mantenimiento = man.id_mantenimiento 
            LEFT JOIN 
                usuario u ON (pl.id_usuario = u.id_usuario OR inst.id_usuario = u.id_usuario OR al.id_usuario = u.id_usuario OR man.id_usuario = u.id_usuario) 
            LEFT JOIN 
                localidad loc ON u.id_localidad = loc.id_localidad 
            LEFT JOIN 
                estado_pago ep ON (pl.id_estado_pago = ep.id_estado_pago OR inst.id_estado_pago = ep.id_estado_pago OR al.id_estado_pago = ep.id_estado_pago) 
            WHERE 
                pld.createdAt BETWEEN :fecha_inicio AND :fecha_fin 
                AND loc.id_localidad = :localidad 
                AND ( 
                    (:tipo_servicio = 'Agua' AND pld.id_planilla IS NOT NULL) OR 
                    (:tipo_servicio = 'Alcantarillado' AND pld.id_alcantarillado IS NOT NULL) OR 
                    (:tipo_servicio = 'Instalación' AND pld.id_instalacion IS NOT NULL) OR 
                    (:tipo_servicio = 'Mantenimiento' AND pld.id_mantenimiento IS NOT NULL) 
                ) 
            GROUP BY 
                loc.nombre, YEAR(pld.createdAt), MONTH(pld.createdAt), tipo_de_servicio;
        `;

        // Ejecutar la consulta
        const [reporteGeneral] = await db.query(query, {
            replacements: {
                tipo_servicio,
                fecha_inicio,
                fecha_fin,
                localidad
            }
        });

        // Enviar la respuesta con los datos obtenidos
        res.json(reporteGeneral);
    } catch (error) {
        console.error('Error al obtener el reporte general:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};
