import  {Router} from 'express';
import clientesCtrl from '../controllers/clientes.controller'

const router = Router();

router.route('/suscripcion')
.get(clientesCtrl.listarClientes)
.post(clientesCtrl.nuevaSuscripcion);

export default router;