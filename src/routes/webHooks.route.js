import {Router} from 'express'
import webHooksController from '../controllers/webHooks.controller'

const router = Router();

/* Ruta agregar usuario */
router.post('/notifications', webHooksController.pago)

// /* Ruta listar usuarios */
// router.get('/listaUsuarios',usuariosController.listarUsuarios)

// /* Ruta buscar usuario */
// router.get('/:id',usuariosController.buscarUsuario)

// /* Ruta eliminar usuario */
// router.delete('/:id', usuariosController.eliminarUsuario)

// /* Ruta actulizar usuario */
// router.put('/:id', usuariosController.actualizarUsuario)


export default router;