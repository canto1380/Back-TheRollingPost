import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
import path from 'path'
import dotenv from 'dotenv'
import bodyParser from 'body-parser'
import jwt, { sign } from 'jsonwebtoken'

import './database'
import userRoutes from './routes/user.route'
import categoriasRoutes from './routes/categorias.route'
import noticiasRoutes from './routes/noticias.route'
import clientesRoutes from './routes/clientes.route'
import comentariosRoutes from './routes/comentarios.route'
// import auth from './controllers/signinUser.controller'

/*** CONFIGURACIONES ***/
/* Instancia de express */
const app = express();

/* Instancia para variables env */
dotenv.config({path:".env"})

/* Creacion de puerto */
app.set('port', process.env.PORT || 4002)
app.listen(app.get('port'), ()=>{
    console.log(`Desde el puerto ${app.get('port')}`)
})

/* Herramientas extras - Middlewares*/
app.use(cors())  
app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(express.static(path.join(__dirname,'../public')))
app.use(bodyParser.json())
// app.use('../public', express.static(`${__dirname}/storage/img`))
// app.use(auth.headers)

// app.use('/user',function(req, res, next) {
//     let token = req.headers['authorization']
//     console.log(req.headers)
//     if (!token) {
//       res.status(401).send({
//         ok: false,
//         message: 'Toket inexistente'
//       })
//     }
//     token = token.replace('Bearer ', '')
  
//     jwt.verify(token, process.env.JWT_SECRET, function(err, tokenn) {
//         console.log(err)
//       if (err) {
//         return res.status(401).send({
//           ok: false,
//           message: 'Token inválido'
//         });
//       } else {
//         req.token = token
//         next()
//       }
//     });
//   });

/* Rutas */
app.use('/user', userRoutes)
app.use('/categorias', categoriasRoutes)
app.use('/noticias', noticiasRoutes)
app.use('/clientes', clientesRoutes)
app.use('/comentarios', comentariosRoutes)

module.exports = app
