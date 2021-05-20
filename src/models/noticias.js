import mongoose, {Schema, Mongoose} from 'mongoose'

import Categoria from './categorias'

const noticiaSchema = new Schema({
    titulo:{
        type: String,
        trim: true,
        required: true,
        minlength:30
    },
    descripcion:{
        type:String,
        trim: true,
        required: true
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
        type: String,
        minlength:20
    },
    descripNoticia:{
        type: String,
        trim: true,
        required: true
    },
    nComentarios:{
        type: Number
    }
},
    {timestamps: true}
)

module.exports = mongoose.model('Noticia', noticiaSchema)
// const Noticia = mongoose.model('Noticia', noticiaSchema)
// export default Noticia