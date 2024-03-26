import { Response, Request } from 'express'
import Estado from '../models/estado'


export const getEstado = async (req: Request, res: Response) => {

    const estado = await Estado.findAll()

    res.json(estado)

}
