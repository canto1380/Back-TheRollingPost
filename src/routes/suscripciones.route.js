import  {Router} from 'express';
import suscripcionesCtrl from '../controllers/suscripciones.controller'
import {validJWT} from '../controllers/auth'

const router = Router();

router.post('/suscribirse', validJWT, suscripcionesCtrl.nuevaSuscripcion);
router.get('/suscripcion', validJWT, suscripcionesCtrl.listarSuscripciones)
router.get('/suscripcionesNoEliminadas', suscripcionesCtrl.suscripcionesNoEliminada)
router.get('/:id', validJWT, suscripcionesCtrl.buscarSuscripcion)
router.delete('/:id', validJWT, suscripcionesCtrl.eliminarSuscripcion)
router.put('/:id', validJWT, suscripcionesCtrl.actualizarSuscripcion)

// router.route('/:id')
// .delete(suscripcionesCtrl.rechazarCancelarSuscripcion)

router.route('/buscar/:email')
.delete(suscripcionesCtrl.errorEliminar)

export default router;