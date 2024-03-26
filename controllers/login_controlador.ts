import { Request, Response } from 'express';
import { login } from '../models/login';
import bcrypt from 'bcrypt';


export const getUsuarios = async (req: Request, res: Response) => {
    const listUsuarios = await login.findAll();
    res.json(listUsuarios);

}