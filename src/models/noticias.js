import mongoose, {Schema, Mongoose} from 'mongoose'
const { ObjectId } = mongoose.Schema

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
        type: ObjectId,
        ref:'Categoria',
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
},
{timestamps: true}
)

module.exports = mongoose.model('Noticia', noticiaSchema)
