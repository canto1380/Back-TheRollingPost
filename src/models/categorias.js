import mongoose ,{Schema} from 'mongoose'

const categoriasSchema = new Schema({
    nombreCategoria:{
        type:String,
        trim:true,
        required:true,
        unique: true
    }
}, 
{timestamps: true})

const Categorias = mongoose.model('categoria', categoriasSchema)
export default Categorias