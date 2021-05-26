import mongoose, {Schema} from 'mongoose';

const clienteSchema = new Schema ({
    apNom:{
        type:String,
        trim:true,
        required:true
    },
    direccion:{
        type:String,
        trim:true,
        required:true,
    },
    localidad:{
        type:String,
        trim:true,
        required:true,
    },
    codigoPostal:{
        type:Number,
        trim:true,
        required:true,
    },
    telefono:{
        type:Number,
        trim:true,
        required:true,
    },
    email:{
        type:String,
        trim:true,
        required:true,
        unique: true
    },
     password:{
        type:String,
        trim:true,
        required:true,
     },
        plan:{
        type:String,
        trim:true,
        required:true,
        }
})

const Clientes= mongoose.model("clientes", clienteSchema);

export default Clientes;