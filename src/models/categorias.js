import mongoose ,{Schema} from 'mongoose'

const categoriasSchema = new Schema({
    nombreCategoria:{
        type:String,
        trim:true,
        required:true,
        unique: true
    },
    destacada:{
        type: Boolean,
        default: false
    }
}, 
{timestamps: true})

module.exports = mongoose.model("Categoria", categoriasSchema)
// const Categorias = mongoose.model('Categoria', categoriasSchema)
// export default Categorias