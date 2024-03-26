
import { Router } from 'express'
import { deleteMaterial, getMateriales, getMaterialxEstado, postMaterial, putMaterial } from '../controllers/material';

const router = Router();

//Controlador de rutas

//Listado de MAteriales
router.get('/mostrarMateriales', getMaterialxEstado);

//Capturar con id
router.get('/materiales/:id_material', getMateriales);

//Agregar Material
router.post('/materiales/', postMaterial)

//Actualizar Material por id
router.put('/materiales/:id_material', putMaterial)

//Eliminar Material por id
router.delete('/materiales/:id_material', deleteMaterial)

export default router;