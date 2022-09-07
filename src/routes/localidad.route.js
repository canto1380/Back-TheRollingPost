import {Router} from 'express'
import localidadControlador from '../controllers/localidad.controller'
import {validJWT} from '../controllers/auth'

const router = Router();

/* Ruta agregar Localidad */
router.post('/addLocalidad', validJWT, localidadControlador.nuevaLocalidad)

/* Ruta listar Localidad */
router.get('/listaLocalidades',localidadControlador.listarLocalidad)

/* Ruta listar Localidad no eliminadas */
router.get('/localidadesNoEliminadas',localidadControlador.localidadesNoEliminadas)

/* Ruta buscar Localidad */
router.get('/:id',localidadControlador.buscarLocalidad)

/* Ruta eliminar Localidad */
router.delete('/:id', validJWT, localidadControlador.eliminarLocalidad)

/* Ruta actualizar Localidad */
router.put('/:id', validJWT, localidadControlador.actualizarLocalidad)

export default router;
