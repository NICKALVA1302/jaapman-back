import { Response, Request } from 'express';
import db from '../db/connection';

export const obtenerReporteCarteraMensual = async (req: Request, res: Response) => {
    try {
        const { tipo_servicio, fecha_inicio, fecha_fin, localidad } = req.body;

        if (!fecha_inicio || !fecha_fin) {
            return res.status(400).json({ error: 'Fecha de inicio y fecha de fin son obligatorias.' });
        }

        const fechaInicioUTC = new Date(fecha_inicio).toISOString();
        const fechaFinUTC = new Date(fecha_fin).toISOString();

        let query = '';
        const replacements: any = {
            tipo_servicio: tipo_servicio || null,
            fecha_inicio: fechaInicioUTC,
            fecha_fin: fechaFinUTC, 
            localidad: localidad === 'null' ? null : localidad,
        };

        if (tipo_servicio) {
            if (localidad && localidad !== 'null' && localidad !== '') { 
                // Caso 1: Localidad específica, un servicio, y el mes
                query = `
                    SELECT
                        loc.nombre AS localidad, 
                        YEAR(pld.createdAt) AS anio, 
                        MONTH(pld.createdAt) AS mes, 
                        DAY(CONVERT_TZ(pld.createdAt, '+00:00', '-05:00')) AS dia,
                        DATE(CONVERT_TZ(pld.createdAt, '+00:00', '-05:00')) AS fecha,  
                        SUM(CASE WHEN pl.id_descuento IS NOT NULL AND pld.id_estado != 2 THEN pld.total_pago ELSE 0 END) AS total_con_descuento, 
                        SUM(CASE WHEN pl.id_descuento IS NULL AND pld.id_estado != 2 THEN pld.total_pago ELSE 0 END) AS total_sin_descuento,
                        SUM(CASE WHEN pld.id_estado = 1 THEN pld.total_pago ELSE 0 END) AS total_facturado,
                        SUM(CASE WHEN ep.id_estado_pago = '2' THEN pld.total_pago ELSE 0 END) AS total_por_facturar,
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
                        AND (loc.id_localidad = :localidad)
                        AND (
                            (:tipo_servicio = 'Agua' AND pld.id_planilla IS NOT NULL) OR
                            (:tipo_servicio = 'Alcantarillado' AND pld.id_alcantarillado IS NOT NULL) OR
                            (:tipo_servicio = 'Instalación' AND pld.id_instalacion IS NOT NULL) OR
                            (:tipo_servicio = 'Mantenimiento' AND pld.id_mantenimiento IS NOT NULL)
                        )
                    GROUP BY
                        loc.nombre, anio, mes, dia
                    ORDER BY
                        anio, mes, dia;
                `;
            } else {
                // Caso 2: Todas las localidades, un servicio
                query = `
                    SELECT
                        loc.nombre AS localidad,
                        SUM(CASE WHEN pl.id_descuento IS NOT NULL AND pld.id_estado != 2 THEN pld.total_pago ELSE 0 END) AS total_con_descuento, 
                        SUM(CASE WHEN pl.id_descuento IS NULL AND pld.id_estado != 2 THEN pld.total_pago ELSE 0 END) AS total_sin_descuento,
                        SUM(CASE WHEN pld.id_estado = 1 THEN pld.total_pago ELSE 0 END) AS total_facturado,
                        SUM(CASE WHEN ep.id_estado_pago = '2' THEN pld.total_pago ELSE 0 END) AS total_por_facturar
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
                        AND (
                            (:tipo_servicio = 'Agua' AND pld.id_planilla IS NOT NULL) OR
                            (:tipo_servicio = 'Alcantarillado' AND pld.id_alcantarillado IS NOT NULL) OR
                            (:tipo_servicio = 'Instalación' AND pld.id_instalacion IS NOT NULL) OR
                            (:tipo_servicio = 'Mantenimiento' AND pld.id_mantenimiento IS NOT NULL)
                        )
                    GROUP BY
                        loc.nombre
                    ORDER BY
                        loc.nombre;
                `;
            }
        } else if (!tipo_servicio) {
            if (localidad && localidad !== 'null' && localidad !== '') {
                // Caso 3: Una localidad, todos los servicios
                query = `
                    SELECT
                        CASE
                            WHEN pld.id_planilla IS NOT NULL THEN 'Agua'
                            WHEN pld.id_alcantarillado IS NOT NULL THEN 'Alcantarillado'
                            WHEN pld.id_instalacion IS NOT NULL THEN 'Instalación'
                            WHEN pld.id_mantenimiento IS NOT NULL THEN 'Mantenimiento'
                        END AS tipo_de_servicio,
                        loc.nombre AS localidad,
                        DATE(CONVERT_TZ(pld.createdAt, '+00:00', '-05:00')) AS fecha, 
                        SUM(CASE WHEN pl.id_descuento IS NOT NULL AND pld.id_estado != 2 THEN pld.total_pago ELSE 0 END) AS total_con_descuento, 
                        SUM(CASE WHEN pl.id_descuento IS NULL AND pld.id_estado != 2 THEN pld.total_pago ELSE 0 END) AS total_sin_descuento,
                        SUM(CASE WHEN pld.id_estado = 1 THEN pld.total_pago ELSE 0 END) AS total_facturado,
                        SUM(CASE WHEN ep.id_estado_pago = '2' THEN pld.total_pago ELSE 0 END) AS total_por_facturar
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
                    GROUP BY
                        tipo_de_servicio
                    ORDER BY
                        tipo_de_servicio;
                `;
            } else {
                // Caso 4: Todas las localidades, todos los servicios (opcional)
                query = `
                    SELECT
                        CASE
                            WHEN pld.id_planilla IS NOT NULL THEN 'Agua'
                            WHEN pld.id_alcantarillado IS NOT NULL THEN 'Alcantarillado'
                            WHEN pld.id_instalacion IS NOT NULL THEN 'Instalación'
                            WHEN pld.id_mantenimiento IS NOT NULL THEN 'Mantenimiento'
                        END AS tipo_de_servicio,
                        SUM(CASE WHEN pl.id_descuento IS NOT NULL AND pld.id_estado != 2 THEN pld.total_pago ELSE 0 END) AS total_con_descuento, 
                        SUM(CASE WHEN pl.id_descuento IS NULL AND pld.id_estado != 2 THEN pld.total_pago ELSE 0 END) AS total_sin_descuento,
                        SUM(CASE WHEN pld.id_estado = 1 THEN pld.total_pago ELSE 0 END) AS total_facturado,
                        SUM(CASE WHEN ep.id_estado_pago = '2' THEN pld.total_pago ELSE 0 END) AS total_por_facturar
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
                    GROUP BY
                        tipo_de_servicio
                    ORDER BY
                        tipo_de_servicio;
                `;
            }
        }

        const [reporteGeneral] = await db.query(query, { replacements });
        console.log('Valor de localidad:', localidad); // Debugging line
        console.log('Tipo de servicio:', tipo_servicio);
        res.json(reporteGeneral);
    } catch (error) {
        console.error('Error al obtener el reporte de cartera mensual:', error);
        return res.status(500).json({ error: 'Error interno del servidor.' });
    }
};

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
                SUM(CASE WHEN pl.id_descuento IS NOT NULL AND pld.id_estado != 2 THEN pld.total_pago ELSE 0 END) AS total_con_descuento, 
                SUM(CASE WHEN pl.id_descuento IS NULL AND pld.id_estado != 2 THEN pld.total_pago ELSE 0 END) AS total_sin_descuento,
                SUM(CASE WHEN pld.id_estado = 1 THEN pld.total_pago ELSE 0 END) AS total_facturado,
                SUM(CASE WHEN ep.id_estado_pago = '2' THEN pld.total_pago ELSE 0 END) AS total_por_facturar,
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

export const obtenerReporteGeneralCarteraVA = async (req: Request, res: Response) => {
    try {
        // Recibir los parámetros de la solicitud HTTP
        const { tipo_servicio, fecha_inicio, fecha_fin } = req.body;

        // Consulta SQL adaptada
        const query = `
            SELECT 
                YEAR(pld.createdAt) AS anio, 
                MONTH(pld.createdAt) AS mes, 
                CONVERT_TZ(pld.createdAt, '+00:00', '-05:00') AS fecha_local, 
                SUM(CASE WHEN pl.id_descuento IS NOT NULL AND pld.id_estado != 2 THEN pld.total_pago ELSE 0 END) AS total_con_descuento, 
                SUM(CASE WHEN pl.id_descuento IS NULL AND pld.id_estado != 2 THEN pld.total_pago ELSE 0 END) AS total_sin_descuento,
                SUM(CASE WHEN pld.id_estado = 1 THEN pld.total_pago ELSE 0 END) AS total_facturado,
                SUM(CASE WHEN ep.id_estado_pago = '2' THEN pld.total_pago ELSE 0 END) AS total_por_facturar, 
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
                estado_pago ep ON (pl.id_estado_pago = ep.id_estado_pago OR inst.id_estado_pago = ep.id_estado_pago OR al.id_estado_pago = ep.id_estado_pago OR man.id_estado_pago = ep.id_estado_pago) 
            WHERE 
                pld.createdAt BETWEEN :fecha_inicio AND :fecha_fin 
                AND (
                    (:tipo_servicio = 'Agua' AND pld.id_planilla IS NOT NULL) OR 
                    (:tipo_servicio = 'Alcantarillado' AND pld.id_alcantarillado IS NOT NULL) OR 
                    (:tipo_servicio = 'Instalación' AND pld.id_instalacion IS NOT NULL) OR 
                    (:tipo_servicio = 'Mantenimiento' AND pld.id_mantenimiento IS NOT NULL)
                ) 
            GROUP BY 
                YEAR(pld.createdAt), MONTH(pld.createdAt), tipo_de_servicio;
        `;

        // Ejecutar la consulta
        const [reporteGeneral] = await db.query(query, {
            replacements: {
                tipo_servicio,
                fecha_inicio,
                fecha_fin
            }
        });

        // Enviar la respuesta con los datos obtenidos
        res.json(reporteGeneral);
    } catch (error) {
        console.error('Error al obtener el reporte general:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};
