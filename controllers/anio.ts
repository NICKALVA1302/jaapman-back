import { Request, Response } from "express";
import db from "../db/connection";

export const getAnios = async (req: Request, res: Response) => {
  try {
    const query = `
            SELECT 
                  *
            FROM 
                anio 
            `;
    // localidad.nombre = '${localidad}' AND
    const [anios] = await db.query(query);
    res.json(anios);
  } catch (error) {
    res.status(500).json({
      msg: "Error al obtener los años",
      error: error.message,
    });
  }
};
