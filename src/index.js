import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
import path from 'path'
import dotenv from 'dotenv'
import './database'
import userRoutes from './routes/user.route'
import categoriasRoutes from './routes/categorias.route'
import noticiasRoutes from './routes/noticias.route'
import clientesRoutes from './routes/clientes.route'

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


/* Rutas */
app.use('/user', userRoutes)
app.use('/categorias', categoriasRoutes)
app.use('/noticias', noticiasRoutes)
app.use('/clientes', clientesRoutes)



