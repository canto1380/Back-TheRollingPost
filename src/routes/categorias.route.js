import {Router} from 'express'
import categoriasController from '../controllers/categorias.controller'
import {validJWT} from '../controllers/auth'

const router = Router();

/* Ruta agregar categoria */
router.post('/addCategoria', validJWT, categoriasController.nuevaCategorias)

/* Ruta listar categorias */
router.get('/listCategoria',categoriasController.listarCategorias)

/* Ruta listar todas las categorias */
router.get('/listTodasCategorias',categoriasController.listarTodasCategorias)

/* Ruta buscar categoria */
router.get('/:id', validJWT,categoriasController.buscarCategoria)

/* Ruta eliminar categoria */
router.delete('/deleteCategoria/:id', validJWT, categoriasController.eliminarCategoria)

/* Ruta actulizar categoria */
router.put('/updateCategoria/:id', validJWT, categoriasController.actualizarcategoria)


export default router;