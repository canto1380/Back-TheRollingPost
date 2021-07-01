import mongoose from 'mongoose'
const schema = mongoose.Schema

const categoriasSchema = new schema({
    nombreCategoria:{
        type:String,
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
