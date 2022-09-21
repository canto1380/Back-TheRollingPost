import {Router} from 'express'
import categoriasController from '../controllers/categorias.controller'
import {validJWT} from '../controllers/auth'

const router = Router();

/* Ruta agregar usuario */
router.post('/addCategoria', validJWT, categoriasController.nuevaCategorias)

/* Ruta listar usuarios */
router.get('/listCategoria',categoriasController.listarCategorias)

/* Ruta buscar usuario */
router.get('/:id', validJWT,categoriasController.buscarCategoria)

/* Ruta eliminar usuario */
router.delete('/deleteCategoria/:id', validJWT, categoriasController.eliminarCategoria)

/* Ruta actulizar usuario */
router.put('/updateCategoria/:id', validJWT, categoriasController.actualizarcategoria)


export default router;