import { Request, Response } from "express";
import db from "../db/connection";

export const obtenerConsumoCliente = async (req: Request, res: Response) => {
  try {
    const { cedula } = req.body;
    if (!cedula) {
      return res.status(500).json({ error: "La cédula es requerida" });
    }
    const query = `
                    SELECT        
                            pe.cedula, 
                            pe.nombre, 
                            pe.apellido,
                            pe.direccion,
                            pe.telefono,
                            pa.nom_resp_edit, 
                            pa.total_pagar, 
                            pa.observaciones, 
                            pa.consumo_total, 
                            pa.estado_lectura
                    FROM          persona pe
                    INNER JOIN    usuario us ON pe.id_persona = us.id_persona
                    INNER JOIN    planilla pa ON us.id_usuario = pa.id_usuario
                    WHERE 			pe.cedula='${cedula}';
            `;
    const [ConsumoCliente] = await db.query(query);
    res.json(ConsumoCliente);
  } catch (error) {
    console.error("Error al obtener los datos:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};
