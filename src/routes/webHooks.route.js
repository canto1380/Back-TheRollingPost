import {Router} from 'express'
import { pagarSuscripcion, crearUsuarioPrueba, getPaymentLink, getSubscriptionLink } from '../controllers/webHooks.controller'
const router = Router();

router.get("/", function (req, res, next) {
    return res.json({
      "/payment": "generates a payment link",
      "/subscription": "generates a subscription link"
    });
  });
  
  router.get("/payment", function (req, res, next) {
    getPaymentLink(req, res);
  });
  
  router.get("/subscription", function (req, res, next) {
    getSubscriptionLink(req, res);
  });

/* Ruta agregar usuario */
// router.post('/notifications/:id', pagarSuscripcion)
// router.post('/usuario-prueba', crearUsuarioPrueba)

// /* Ruta listar usuarios */
// router.get('/listaUsuarios',usuariosController.listarUsuarios)

// /* Ruta buscar usuario */
// router.get('/:id',usuariosController.buscarUsuario)

// /* Ruta eliminar usuario */
// router.delete('/:id', usuariosController.eliminarUsuario)

// /* Ruta actulizar usuario */
// router.put('/:id', usuariosController.actualizarUsuario)


export default router;