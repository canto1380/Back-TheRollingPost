import  mongoose from 'mongoose'
const Schema = mongoose.Schema

const paisSchema = new Schema({
    pais:{
        type:String,
        trim: true,
        required: true,
        maxLength: 60
    },
    deleted: {
        type: Boolean,
        default: false
    }
}, {timestamps: true})

// const Comentario = mongoose.model('comentario', comentariosSchema)
// export default Comentario

module.exports = mongoose.model("Pais", paisSchema)