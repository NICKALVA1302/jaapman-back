import { Request, Response } from 'express';
import { usuario_rol } from '../models/usuario_rol';
import db from '../db/connection';
import { QueryTypes } from 'sequelize';


export const getUsuarioRol = async (req: Request, res: Response) => {
    const listUsarioRol = await usuario_rol.findAll();
    res.json(listUsarioRol);

}

export const getNombreUsuarioRol = async (req: Request, res: Response) => {
    const { id_usuarioRol } = req.params;

    try {
        // Buscar la fila existente por el id_usuario
            const result = await db.query(`
            SELECT CONCAT(per.nombre, ' ', per.apellido) AS fullname
            FROM usuario_rol ur
            JOIN usuario u ON ur.id_usuario = u.id_usuario
            JOIN persona per ON u.id_persona = per.id_persona
            WHERE id_usuario_rol = :id_usuarioRol;
        `, {
            replacements: { id_usuarioRol: id_usuarioRol },
            type: QueryTypes.SELECT
        });
        res.status(200).json(result);

    } catch (error) {
        console.error("Error al realizar la consulta:", error);
        res.status(500).json({ mensaje: "Error al realizar la consulta" });
    }
};