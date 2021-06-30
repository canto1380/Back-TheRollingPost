import {Router} from 'express';
import userController from '../controllers/user.controller.'
import signinController  from '../controllers/signinUser.controller'

const router = Router();

/* Ruta agregar usuario */
router.post('/addUser', userController.nuevoUsuario)

/* Ruta listar usuarios */
router.get('/listUser',userController.listarUsuarios)

/* Ruta buscar usuario */
router.get('/user/:id',userController.buscarUsuario)

/* Ruta eliminar usuario */
router.delete('/deleteUser/:id', userController.eliminarUsuario)

/* Ruta actulizar usuario */
router.put('/updateUser/:id', userController.actualizarUsuario)

/* Ruta para autenticar usuario */
// router.post('/signin', signinController.signin)
// router.get('/datos', signinController.rutasProtegidas)


export default router;
