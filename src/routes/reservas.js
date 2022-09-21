import {Router} from 'express'
import reservaController from '../controllers/reservas'

const router = Router();

/* Ruta agregar noticia */
router.post('/agregarReserva' ,reservaController.nuevaReserva)

/* Ruta listar noticias */
router.get('/listaReservas',reservaController.listarReservas)
router.get('/busquedaReservas', reservaController.busqueda)
/* Ruta buscar noticia */
router.get('/:id',reservaController.buscarReserva)


/* Ruta eliminar noticia */
router.delete('/:id', reservaController.eliminarReserva)

/* Ruta actualizar noticias */
router.put('/:id', reservaController.actualizarReserva)

export default router;
