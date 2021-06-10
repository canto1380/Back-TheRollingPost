import mongoose ,{Schema} from 'mongoose'
import bcrypt from 'bcrypt'

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
            unique: true,
            maxlength:25
        },
        clave:{
            type: String,
            trim: true,
            required:true,
            minlength: 8,
            maxlength: 15
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

userSchema.pre('save', function(next){
    
    bcrypt.genSalt(10).then(salts =>{
        bcrypt.hash(this.clave,salts).then(hash =>{
            this.clave =hash;
            next();
        }).catch(error => next(error))
    }).catch(error => next(error))
})

userSchema.methods.comparePassword = function(clavee, cb) {
    bcrypt.compare(clavee , this.clave, function(err, isMatch) {
        if (err) return cb(err);
        cb(null, isMatch);
     });
 };


const User = mongoose.model('user', userSchema)
export default User