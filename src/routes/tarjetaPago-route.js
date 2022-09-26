import {Router} from 'express'
import tarjetaPago from '../controllers/tarjetaPago.controller'
import {validJWT} from '../controllers/auth'

const router = Router();

/* Ruta agregar Tarjeta */
router.post('/addTarjeta', validJWT ,tarjetaPago.nuevaTarjeta)

/* Ruta listar Tarjeta */
router.get('/listaTarjetas',tarjetaPago.listarTarjetasPorCuenta)

/* Ruta eliminar Tarjeta */
router.delete('/:id', validJWT, tarjetaPago.eliminarTarjeta)



export default router;
