import {Router} from 'express'
import noticiasControlador from '../controllers/noticias.controller'

const router = Router();

/* Ruta agregar noticia */
router.post('/addNoticia', noticiasControlador.nuevaNoticia)

/* Ruta listar mnoticias */
router.get('/listNoticias',noticiasControlador.listarNoticias)

/* Ruta buscar noticia */
router.get('/noticia/:id',noticiasControlador.buscarNoticia)

/* Ruta eliminar noticia */
router.delete('/deleteNoticia/:id', noticiasControlador.eliminarNoticia)

/* Ruta actulizar noticias */
router.put('/updateNoticias/:id', noticiasControlador.actualizarNoticia)

export default router;
