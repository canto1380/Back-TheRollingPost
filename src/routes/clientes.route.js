import  {Router} from 'express';
import clientesCtrl from '../controllers/clientes.controller'

const router = Router();

router.get('/suscripcion',clientesCtrl.listarClientes)
router.post('/suscribirse',clientesCtrl.nuevaSuscripcion);

router.route('/:id')
.delete(clientesCtrl.rechazarCancelarSuscripcion)

router.route('/buscar/:email')
.delete(clientesCtrl.errorEliminar)

export default router;