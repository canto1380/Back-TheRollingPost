import { config } from 'dotenv'
import mongoose, {Schema, Mongoose} from 'mongoose'

import Categoria from './categorias'

const noticiaSchema = new Schema({
    titulo:{
        type: String,
        trim: true,
        required: true,
        minLength: 12,
        maxLength: 40
    },
    descripcion:{
        type:String,
        trim: true,
        required: true,
        minLength: 12,
        maxLength: 50
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
        required: true,
        minLength: 2000,
        maxLength: 6500
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