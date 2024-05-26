import { Router } from 'express'
import { getEstado } from '../../../controllers/estado';


const router = Router();

//
router.get('/', getEstado);

export default router