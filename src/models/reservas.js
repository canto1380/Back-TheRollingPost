import mongoose from "mongoose";
const Schema = mongoose.Schema

const reservationsSchema = new Schema({
    cancelled:{
        type: Boolean,
    },
    paid:{
        type: Boolean, 
    },
    paymentMethod:{
        type: String,
    },
    total:{
        type: Number,
    },
    user:{
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
    },
    currency:{
        type: String,
    },
    confirmed:{
        type: Boolean,
    },
    code:{
        type: String,
    },
    cancelledAt:{
        type: Date,
    },
    // summary : {
    // people : Number,
    // languages: String,
    // date : Date,
    // amount : String,
    // currency : String,
    // symbol : String
    // },
    receipt:{
        type: String,
    },
    invoice:{
        type: String,
    },
    }, { timestamps: true })

module.exports = mongoose.model('Reserva', reservationsSchema)

// export function find() {
//     throw new Error('Function not implemented.');
// }
// export function findById(id) {
//     throw new Error('Function not implemented.');
// }

// export function findByIdAndDelete(id) {
//     throw new Error('Function not implemented.');
// }

// export function findByIdAndUpdate(id, body) {
//     throw new Error('Function not implemented.');
// }

