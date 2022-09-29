import mercadopago from "mercadopago";
import dotenv from 'dotenv'

mercadopago.configure({
    access_token: process.env.ACCESS_TOKEN,
    sandbox:true,
            client_id: process.env.CLIENT_ID,
            client_secret: process.env.CLIENT_SECRET
})

module.exports = {
    mercadopago
}