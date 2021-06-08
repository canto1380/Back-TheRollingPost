import  mongoose from 'mongoose'
const Schema = mongoose.Schema

const comentariosSchema = new Schema({
    comentario:{
        type:String,
        trim: true,
        required: true,
        minLength: 10,
        maxLength: 300
    },
    idNoticia:{
        type: Schema.Types.ObjectId,
        ref:'Noticia'
    }
}, {timestamps: true})

// const Comentario = mongoose.model('comentario', comentariosSchema)
// export default Comentario

module.exports = mongoose.model("Comentario", comentariosSchema)