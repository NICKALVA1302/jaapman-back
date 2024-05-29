import { Response, Request } from 'express'
import db from '../../../db/connection';
import Tarifa from "../../../models/tarifa"


export const getTarifa = async (req: Request, res: Response) => {

    try {
        const listTarifa = await Tarifa.findAll({

            attributes: [
                'id_tarifa',
                'rango',
                'valor'
            ],
        });

        res.json(listTarifa);

    } catch (error) {
        console.error('Error al obtener la lista de tarifa:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }

};

export const putTarifa = async (req: Request, res: Response) => {

    try {
        const { id_tarifa1, valor1, id_tarifa2, valor2, id_tarifa3, valor3 } = req.body;

        // Iniciar transacción
        await db.transaction(async (t) =>{

            //Actualizar valores
            await db.query('UPDATE tarifa SET valor = ? WHERE id_tarifa = ?', { replacements: [valor1, id_tarifa1], transaction: t });
            await db.query('UPDATE tarifa SET valor = ? WHERE id_tarifa = ?', { replacements: [valor2, id_tarifa2], transaction: t });
            await db.query('UPDATE tarifa SET valor = ? WHERE id_tarifa = ?', { replacements: [valor3, id_tarifa3], transaction: t });

            //respuesta
            res.status(200).json({ msg: 'Tarifa actualizado correctamente' });
        });
        
    } catch (error) {
        console.error('Error al actualizar los valores de tarifa:', error);
        res.status(500).json({ msg: 'Error interno del servidor' });
    }
};
