import  mongoose from 'mongoose'
const Schema = mongoose.Schema

const provinciaSchema = new Schema({
    provincia:{
        type:String,
        trim: true,
        required: true,
        maxLength: 50
    },
    idPais:{
        type: Schema.Types.ObjectId,
        ref:'Pais'
    },
    deleted: {
        type: Boolean,
        default: false
    }
}, {timestamps: true})

// const Comentario = mongoose.model('comentario', comentariosSchema)
// export default Comentario

module.exports = mongoose.model("Provincia", provinciaSchema)