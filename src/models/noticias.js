import { config } from 'dotenv'
import mongoose, {Schema, Mongoose} from 'mongoose'
import {appConfig} from '../../config'
import Categoria from './categorias'

const noticiaSchema = new Schema({
    titulo:{
        type: String,
        trim: true,
        required: true,
        // minLength: 12,
        // maxLength: 40
    },
    descripcion:{
        type:String,
        trim: true,
        required: true,
        // minLength: 12,
        // maxLength: 50
    },
    categoria:{
        type: String,
        required: true
    },
    foto:{
        type: String
    },
    pieDeFoto:{
        type: String
    },
    descripNoticia:{
        type: String,
        required: true,
        // minLength: 20,
        // maxLength: 6500
    },
    autor:{
        type: String,
        trim: true,
        required: true
    },
    hora:{
        type: String,
        trim: true,
        required: true
    },
    fecha:{
        type: String,
        trim: true,
        required: true
    }
}
)
// NoticiaSchema.methods.setImgUrl = function setImgUrl(filename) {
//     const {host, port} = appConfig
//     this.image = `${host}:${port}/public/${filename}`
// }

module.exports = mongoose.model('Noticia', noticiaSchema)
// const Noticia = mongoose.model('Noticia', noticiaSchema)
// export default Noticia