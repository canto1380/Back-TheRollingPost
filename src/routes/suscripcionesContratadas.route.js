import {Router} from 'express'
import suscripcionesContratadas from '../controllers/suscripcionesContratadas.controller'
import {validJWT} from '../controllers/auth'

const router = Router();

/* Ruta agregar Suscripcion */
router.post('/nuevaSuscripcion', validJWT ,suscripcionesContratadas.nuevaSuscripcion)

/* Ruta listar Suscripcion */
router.get('/suscripcionesContratadas',suscripcionesContratadas.listarSuscripciones)

/* Ruta eliminar Suscripcion */
router.delete('/:id', validJWT, suscripcionesContratadas.eliminarSuscripcion)



export default router;
