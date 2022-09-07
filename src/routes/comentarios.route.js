import {Router} from 'express'
import comentariosController from '../controllers/comentarios.controller'
import {validJWT} from '../controllers/auth'

const router = Router()

/* Ruta agregar comentario */
router.post('/addComentario', validJWT, comentariosController.nuevoComentario)

/* Ruta listar comentarios */
router.get('/listComentarios',comentariosController.listarComentarios)

/* Ruta buscar comentarios */
router.get('/comentario/:id', validJWT,comentariosController.buscarComentario)

/* Ruta eliminar comentarios */
router.delete('/deleteComentario/:id', validJWT, comentariosController.eliminarComentario)


export default router;