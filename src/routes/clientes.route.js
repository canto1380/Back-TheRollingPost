import  {Router} from 'express';
import clientesCtrl from '../controllers/clientes.controller'

const router = Router();

router.route('/suscripcion')
.get(clientesCtrl.listarClientes)
.post(clientesCtrl.nuevaSuscripcion);

router.route('/:id')
.delete(clientesCtrl.rechazarCancelarSuscripcion)

router.route('/buscar/:email')
.delete(clientesCtrl.errorEliminar)

export default router;