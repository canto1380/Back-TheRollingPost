import {Router} from 'express'
import categoriasController from '../controllers/categorias.controller'

const router = Router();

/* Ruta agregar usuario */
router.post('/addCategoria', categoriasController.nuevaCategorias)

/* Ruta listar usuarios */
router.get('/listCategoria',categoriasController.listarCategorias)

/* Ruta buscar usuario */
router.get('/categorias/:id',categoriasController.buscarCategoria)

/* Ruta eliminar usuario */
router.delete('categorias/deleteCategoria/:id', categoriasController.eliminarCategoria)

/* Ruta actulizar usuario */
router.put('categorias/updateCategoria/:id', categoriasController.actualizarcategoria)


export default router;