import { Request, Response } from "express";
import db from "../db/connection";

export const obtenerPagoCliente = async (req: Request, res: Response) => {
  try {
    const { cedula, fechaInicio, fechaFin } = req.body;
    if (!cedula) {
      return res.status(500).json({ error: "La cédula es requerida" });
    }
    if (!fechaInicio) {
      return res.status(500).json({ error: "La fecha Inicio es requerida" });
    }
    if (!fechaFin) {
      return res.status(500).json({ error: "La fechaFin es requerida" });
    }
    const query = `
      SELECT 
        persona.cedula AS 'PersonaCedula',
      	persona.nombre AS 'PersonaNombre',
      	persona.apellido AS 'PersonaApellido',
      	persona.direccion AS 'PersonaDireccion',
      	persona.telefono AS 'PersonaTelefono',
        planilla_detalle.total_pago AS 'Total', 
        tipo_pago.nombre AS 'Tipo',
        pago.abono_realizado AS 'Abono',
        pago.createdAt AS 'Fecha',
        planilla_detalle.deuda_pendiente AS 'Deuda', 
        planilla_detalle.descripcion AS 'Descripcion', 
        estado_pago.nombre AS 'Estado' 
      FROM 
        pago 
        INNER JOIN planilla_detalle ON pago.id_planilla_det = planilla_detalle.id_planilla_det 
        INNER JOIN tipo_pago ON pago.id_tipopago = tipo_pago.id_tipopago 
        INNER JOIN estado_pago ON pago.id_estado_pago = estado_pago.id_estado_pago
        INNER JOIN planilla ON planilla_detalle.id_planilla = planilla.id_planilla
        INNER JOIN usuario ON planilla.id_usuario = usuario.id_usuario
        INNER JOIN persona ON usuario.id_persona = persona.id_persona
      WHERE 
        persona.cedula = '${cedula}' AND 
        pago.createdAt BETWEEN '${fechaInicio}' AND '${fechaFin}'
      ORDER BY 
        pago.createdAt;
    `;
    const [PagoCliente] = await db.query(query);

    res.json(PagoCliente);
  } catch (error) {
    console.error("Error al obtener los datos:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};
