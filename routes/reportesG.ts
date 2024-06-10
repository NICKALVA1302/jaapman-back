import { Router } from "express";
import {
  obtenerClientesPorLocalidad,
  obtenerClientesSuspendidos,
} from "../controllers/reportesClientes";
import { obtenerConsumoCliente } from "../controllers/reportesConsumoCliente";
import { obtenerDeudaPueblo } from "../controllers/reportesDeudaPueblo";
import { obtenerReporteCarteraVA, obtenerReporteGeneralCarteraVA } from "../controllers/reportesCarteraVA";
import { obtenerLecturaCliente } from "../controllers/reportesLecturaCliente";
import { obtenerPagoCliente } from "../controllers/reportesPagoCliente";
import {
  obtenerRecudacionAlcantarillado,
  obtenerRecudacionMantenimiento,
} from "../controllers/reportesTipoRecudacion";
import { valoresGeneradosXMes } from "../controllers/reportesValoresXMes";
//aqui va todas las rutas de reportes:
// en posmant una ruta deberia verse asi:  http://localhost:3000/api/cajero/getclientesSusp

const router = Router();

// Ruta para obtener datos usuarios suspendidos
router.post("/getclientesSusp", obtenerClientesSuspendidos);

// Ruta para obtener datos usuarios por localidad
router.post("/getclientesLoc", obtenerClientesPorLocalidad);

//ruta para obtener datos de cartera vencida anual
router.post("/getcarteraVA", obtenerReporteCarteraVA);

//ruta para obtener datos generales de Cartera Vencida Anual
router.post("/getGeneralCarteraVA", obtenerReporteGeneralCarteraVA)

//ruta para obtener datos de Consumos Clientes
router.post("/getConsumoCliente", obtenerConsumoCliente);

//ruta para obtener datos de Deuda Pueblo
router.post("/getDeudaPueblo", obtenerDeudaPueblo);

//ruta para obtener datos de Lectura Cliente
router.post("/getLecturaCliente", obtenerLecturaCliente);

//ruta para obtener datos de Pago CLiente
router.post("/getPagoCliente", obtenerPagoCliente);

//ruta para obtener datos Recudacion Por tipo "Alcantarillado"
router.get("/getrecudacionAlca", obtenerRecudacionAlcantarillado);

//ruta para obtener datos Recudacion Por tipo "Alcantarillado"
router.get("/getrecudacionMante", obtenerRecudacionMantenimiento);

//ruta para obtener valores generados por mes
router.post("/GeneradosxMes", valoresGeneradosXMes);
export default router;
