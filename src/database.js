import mongoose from 'mongoose'

// const url= 'mongodb://localhost:27017/therollingpost'
const url= 'mongodb+srv://ata:2203@cluster0.b9epm.mongodb.net/therollingpost'

mongoose.connect(url,{
    useNewUrlParser:true,
    useUnifiedTopology:true,
    useCreateIndex: true,
    useFindAndModify:true
})

const connection = mongoose.connection;
connection.once('open', () =>{
    console.log("Base de datos conectada")
})