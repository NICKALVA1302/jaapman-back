import { Request, Response } from "express";
import db from "../db/connection";

export const obtenerLecturaCliente = async (req: Request, res: Response) => {
  try {
    const { cedula, fecha } = req.body;
    if (!cedula) {
      return res.status(500).json({ error: "La cédula es requerida" });
    }
    // if (!localidad) {
    //   return res.status(500).json({ error: "La localidad es requerida" });
    // }
    if (!fecha) {
      return res.status(500).json({ error: "La fecha es requerida" });
    }
    await db.query("SET lc_time_names = 'es_ES';");

    const query = `
            SELECT 
                DATE_FORMAT(responsable_lectura.fecha, '%M') AS 'Mes',
                YEAR(responsable_lectura.fecha) AS 'Año', 
                planilla.lectura_anterior AS 'Lectura Anterior', 
                planilla.lectura_actual AS 'Lectura Actual', 
                planilla.consumo_total AS 'Consumo', 
                estado_pago.nombre AS 'Estado', 
                pago.createdAt  AS 'Fecha Abono', 
                planilla_detalle.deuda_pendiente  AS 'TP COM', 
                planilla_detalle.total_pago AS 'Valor', 
                planilla.total_pagar AS 'Saldo'
            FROM 
                factura 
            INNER JOIN 
                factura_detalle ON factura.id_factura = factura_detalle.id_factura 
            INNER JOIN 
                planilla ON factura_detalle.id_planilla = planilla.id_planilla 
            INNER JOIN 
                planilla_detalle ON planilla.id_planilla = planilla_detalle.id_planilla 
            INNER JOIN 
                responsable_lectura ON planilla.id_responsable_lectura = responsable_lectura.id_responsable_lectura 
            INNER JOIN 
                usuario ON factura.id_usuario = usuario.id_usuario AND planilla.id_usuario = usuario.id_usuario 
            INNER JOIN 
                persona ON usuario.id_persona = persona.id_persona 
            INNER JOIN 
                localidad ON usuario.id_localidad = localidad.id_localidad 
            INNER JOIN 
                pago ON planilla_detalle.id_planilla_det = pago.id_planilla_det 
            INNER JOIN 
                estado_pago ON planilla.id_estado_pago = estado_pago.id_estado_pago AND pago.id_estado_pago = estado_pago.id_estado_pago
            WHERE 
                
                YEAR(responsable_lectura.fecha) = ${fecha} AND
                persona.cedula = '${cedula}';
            `;
    // localidad.nombre = '${localidad}' AND
    const [LecturaCliente] = await db.query(query);
    res.json(LecturaCliente);
  } catch (error) {
    console.error("Error al obtener los datos:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};
