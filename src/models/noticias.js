import { config } from 'dotenv'
import mongoose, {Schema, Mongoose} from 'mongoose'

import Categoria from './categorias'

const noticiaSchema = new Schema({
    titulo:{
        type: String,
        trim: true,
        required: true
    },
    descripcion:{
        type:String,
        trim: true,
        required: true,
        minLength: 20
    },
    categoria:{
        type: String,
        required: true
    },
    foto:{
        type: "String",
        required: true
    },
    pieDeFoto:{
        type: String
    },
    descripNoticia:{
        type: String,
        trim: true,
        required: true
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

module.exports = mongoose.model('Noticia', noticiaSchema)
// const Noticia = mongoose.model('Noticia', noticiaSchema)
// export default Noticia