import mongoose from 'mongoose'
const Schema = mongoose.Schema

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
        type: Schema.Types.ObjectId,
        ref:'Categoria',
        require:true
    }
    ,
    foto:{
        type: String
    },
    pieDeFoto:{
        type: String
    },
    descripNoticia:{
        type: String,
        required: true,
        minLength: 20,
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
    },
    publicado:{
        type: Boolean,
        default: false
    }
},
{timestamps: true}
)

module.exports = mongoose.model('Noticia', noticiaSchema)
