import  mongoose from 'mongoose'
const Schema = mongoose.Schema

const localidadSchema = new Schema({
    localidad:{
        type:String,
        trim: true,
        required: true,
        maxLength: 60
    },
    idProvincia:{
        type: Schema.Types.ObjectId,
        ref:'Provincia'
    },
    deleted: {
        type: Boolean,
        default: false
    }
}, {timestamps: true})

// const Comentario = mongoose.model('comentario', comentariosSchema)
// export default Comentario

module.exports = mongoose.model("Localidad", localidadSchema)