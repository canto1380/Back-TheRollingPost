import {Router} from 'express';
import signinController  from '../controllers/signinUser.controller'

const router = Router();

/* Ruta para autenticar usuario */
router.post('/signin', signinController.signin)
export default router;
