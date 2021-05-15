import mongoose from 'mongoose'

const url= 'mongodb://localhost:27017/therollingpost'

mongoose.connect(url,{
    useNewUrlParser:true,
    useUnifiedTopology:true,
    useCreateIndex: true
})

const connection = mongoose.connection;
connection.once('open', () =>{
    console.log("Base de datos conectada")
})