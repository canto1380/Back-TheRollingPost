import mongoose ,{Schema} from 'mongoose'

const userSchema = new Schema ({
    
        nombre:{
            type: String,
            trim: true,
            required:true,
            maxlength:60
        },
        apellido:{
            type: String,
            trim: true,
            required:true,
            maxlength:60
        },
        email:{
            type: String,
            trim: true,
            required:true,
            unique: true
        },
        clave:{
            type: String,
            trim: true,
            required:true,
            minlength: 8
        },
        telefono:{
            type: Number,
            trim: true,
            required:true
        },
        tipoUser:{
            type: String,
            trim: true,
            required:true
        }
},
{timestamps: true}
)

const User = mongoose.model('user', userSchema)
export default User