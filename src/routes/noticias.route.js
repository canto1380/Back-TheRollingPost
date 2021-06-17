import {Router} from 'express'
import noticiasControlador from '../controllers/noticias.controller'

const router = Router();

/* Ruta agregar noticia */
router.post('/addNoticia' ,noticiasControlador.nuevaNoticia)

/* Ruta listar noticias */
router.get('/listNoticias',noticiasControlador.listarNoticias)

/* Ruta buscar noticia */
router.get('/:id',noticiasControlador.buscarNoticia)

// router.param('byId', noticiasControlador.byId)
router.get('/foto/:byId', noticiasControlador.buscarPhoto)

/* Ruta eliminar noticia */
router.delete('/:id', noticiasControlador.eliminarNoticia)

/* Ruta actualizar noticias */
router.put('/:id', noticiasControlador.actualizarNoticia)

export default router;
