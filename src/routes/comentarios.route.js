import {Router} from 'express'
import comentariosController from '../controllers/comentarios.controller'

const router = Router()

/* Ruta agregar comentario */
router.post('/addComentario', comentariosController.nuevoComentario)

/* Ruta listar comentarios */
router.get('/listComentarios',comentariosController.listarComentarios)

/* Ruta buscar comentarios */
router.get('/comentario/:id',comentariosController.buscarComentario)

/* Ruta eliminar comentarios */
router.delete('/deleteComentario/:id', comentariosController.eliminarComentario)


export default router;