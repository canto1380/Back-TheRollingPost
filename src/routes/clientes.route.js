import  {Router} from 'express';
import clientesCtrl from '../controllers/clientes.controller'

const router = Router();

router
.post('/clientes', clientesCtrl.nuevaSuscripcion);