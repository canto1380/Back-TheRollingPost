import {Router} from 'express'
import usuariosController from '../controllers/usuariosController'

const router = Router();

/* Ruta agregar usuario */
router.post('/agregarUsuario', usuariosController.nuevoUsuario)

/* Ruta listar usuarios */
router.get('/listaUsuarios',usuariosController.listarUsuarios)

/* Ruta buscar usuario */
router.get('/:id',usuariosController.buscarUsuario)

/* Ruta eliminar usuario */
router.delete('/:id', usuariosController.eliminarUsuario)

/* Ruta actulizar usuario */
router.put('/:id', usuariosController.actualizarUsuario)


export default router;