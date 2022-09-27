import express from "express";
import morgan from "morgan";
import cors from "cors";
import path from "path";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import jwt, { sign } from "jsonwebtoken";
import "./database";
import userRoutes from "./routes/user.route";
import categoriasRoutes from "./routes/categorias.route";
import noticiasRoutes from "./routes/noticias.route";
import suscripcionesRoutes from "./routes/suscripciones.route";
import comentariosRoutes from "./routes/comentarios.route";
import signin from "./routes/signin.route";
import usuariosRoutes from "./routes/usuariosRoute";
import reservaRoutes from "./routes/reservas";
import paisesRoutes from "./routes/paises.route";
import provinciasRoutes from "./routes/provincia.route";
import localidadesRoutes from "./routes/localidad.route";
import webHooksRoutes from './routes/webHooks.route'
import tarjetaPago  from './routes/tarjetaPago-route'
import suscripcionesContratadas from './routes/suscripcionesContratadas.route'

import {validJWT} from './controllers/auth'

/*** CONFIGURACIONES ***/
/* Instancia de express */
const app = express();

/* Instancia para variables env */
dotenv.config({ path: ".env" });

/* Creacion de puerto */
app.set("port", process.env.PORT || 4002);
app.listen(app.get("port"), () => {
  console.log(`Desde el puerto ${app.get("port")}`);
});

/* Herramientas extras - Middlewares*/
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "../public")));
app.use(bodyParser.json());

// app.use("/secure", function (req, res, next) {
//   let token = req.headers["authorization"];
//   console.log(req.headers);
//   if (!token) {
//     res.status(401).send({
//       ok: false,
//       message: "Toket inexistente",
//     });
//   }
//   token = token.replace("Bearer ", "");
//   jwt.verify(token, process.env.JWT_SECRET, function (err, tokenn) {
//     console.log(err);
//     if (err) {
//       return res.status(401).send({
//         ok: false,
//         message: "Token inválido",
//       });
//     } else {
//       req.token = token;
//       next();
//     }
//   });
// });


// app.use(validJWT);

/* Rutas */
app.use("/admin", signin);
app.use("/user", userRoutes);
app.use("/secure/categorias", categoriasRoutes);
app.use("/secure/noticias", noticiasRoutes);
app.use("/secure/suscripciones", suscripcionesRoutes);
app.use("/comentarios", comentariosRoutes);
app.use("/categorias", categoriasRoutes);
app.use("/noticias", noticiasRoutes);
app.use("/suscripciones", suscripcionesRoutes);
app.use("/usuarios", usuariosRoutes);
app.use("/reservas", reservaRoutes);
app.use("/pais", paisesRoutes);
app.use("/provincia", provinciasRoutes);
app.use("/localidad", localidadesRoutes);
app.use('/mercado-pago', webHooksRoutes);
app.use('/tarjeta-pago', tarjetaPago)
app.use('/suscripciones-contratadas', suscripcionesContratadas)

module.exports = app;
