import {Router} from 'express';
import userController from '../controllers/user.controller.'
import {validJWT} from '../controllers/auth'
const router = Router();

/* Ruta agregar usuario */
router.post('/addUser', validJWT, userController.nuevoUsuario)

/* Ruta listar usuarios */
router.get('/listUser', validJWT, userController.listarUsuarios)

/* Ruta buscar usuario */
router.get('/user/:id', userController.buscarUsuario)

/* Ruta eliminar usuario */
router.delete('/deleteUser/:id', validJWT, userController.eliminarUsuario)

/* Ruta actulizar usuario */
router.put('/updateUser/:id', validJWT, userController.actualizarUsuario)

export default router;
