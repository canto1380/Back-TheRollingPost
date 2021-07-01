import mongoose from 'mongoose'


 const url = 'mongodb+srv://rollingpost7a:rolling@cluster0.vvsui.mongodb.net/therollingpost'
 

// const url = 'mongodb+srv://ata:ata123@cluster0.b9epm.mongodb.net/therollingpost'

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