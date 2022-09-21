import {Router} from 'express'
import provinciaControlador from '../controllers/provincia.controller'
import {validJWT} from '../controllers/auth'

const router = Router();

/* Ruta agregar Provincia */
router.post('/addProvincia', validJWT ,provinciaControlador.nuevaProvincia)

/* Ruta listar Provincia */
router.get('/listProvincias',provinciaControlador.listarProvincia)

/* Ruta listar Provincias no eliminadas */
router.get('/provinciasNoEliminadas',provinciaControlador.provinciasNoEliminadas)

/* Ruta listar Provincias no eliminadas sin paginacion*/
router.get('/provinciasNoEliminadas-todas',provinciaControlador.provinciasNoEliminadas1)

/* Ruta buscar Provincia */
router.get('/:id',provinciaControlador.buscarProvincia)

/* Ruta eliminar Provincia */
router.delete('/:id', validJWT, provinciaControlador.eliminarProvincia)

/* Ruta actualizar Provincia */
router.put('/:id', validJWT, provinciaControlador.actualizarProvincia)

/* Restaurar Provincia */
router.put('/restaurarProvincia/:id', validJWT, provinciaControlador.restaurarProvincia)

export default router;
