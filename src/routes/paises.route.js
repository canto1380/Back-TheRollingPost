import {Router} from 'express'
import paisesController from '../controllers/pais.controller'
import {validJWT} from '../controllers/auth'

const router = Router();

/* Ruta agregar Pais */
router.post('/addPais', validJWT ,paisesController.nuevoPais)

/* Ruta listar Paises */
router.get('/listPaises',paisesController.listarPaises)

/* Ruta listar Paises no eliminados*/
router.get('/paisesNoEliminados',paisesController.paisesNoEliminados)

/* Ruta buscar Pais */
router.get('/:id',paisesController.buscarPais)

// router.get('/foto/:byId', paisesController.buscarPhoto)

/* Ruta eliminar Pais */
router.delete('/:id', validJWT, paisesController.eliminarPais)

/* Ruta actualizar Pais */
router.put('/:id', validJWT, paisesController.actualizarPais)

export default router;
