import Suscipciones from '../models/suscripciones';
import { mercadopago } from '../utils/mercadoPago'
import { createPayment, createSubscription } from '../services/webhooks.service';

export const getPaymentLink = async(req, res) => {
  try {
    const payment = await createPayment();

    return res.json(payment);
  } catch (error) {
    console.log(error);

    return res
      .status(500)
      .json({ error: true, msg: "Failed to create payment" });
  }
}

export const getSubscriptionLink = async(req, res) => {
  try {
    const subscription = await createSubscription();

    return res.json(subscription);
  } catch (error) {
    console.log(error);

    return res
      .status(500)
      .json({ error: true, msg: "Failed to create subscription" });
  }
}



export const pagarSuscripcion = async (req, res) => {
  try {
    console.log(req.params.id)
    const suscripcionAPagar = await Suscipciones.findById(req.params.id)
    const urlPreference = "https://api.mercadopago.com/checkout/preferences";
    let preference = {
      items: [
        {
          title: 'Titulo',
          unit_price: 95,
          quantity: 1,
        }
      ],
      payer: {
        "phone": {},
        "identification": {},
        "address": {}
      },
      payment_methods: {
        excluded_payment_methods: [
          {}
        ],
        excluded_payment_types: [
          {}
        ]
      },
      shipments: {
        free_methods: [
          {}
        ],
        receiver_address: {}
      },
      back_urls: {},
      differential_pricing: {},
      tracks: [
        {
          type: "google_ad"
        }
      ],
      metadata: {}
    };
    mercadopago.preferences.create(preference)
    .then(function(response) {
      console.log(response)
      res.JSON({
        global: response.body.id
      })
    })
    .catch(function(error) {
      console.log(error)
    })
    res.status(200).send('OK')
  } catch (err) {
    console.log(err);
  }
};

export const crearUsuarioPrueba = async(req, res) => {
  try {
    const data = {
      site_id: "MLA1",
      description: "a description"
    };
    const config = {
      method: "POST",
      Headers: {
        "Content-Type":"application/json",
        Authorization: process.env.ACCESS_TOKEN
      },
      body: JSON.stringify(data)
    }
    const url = 'https://api.mercadopago.com/users/test'
    const response = await fetch(url, config)
    return response
  } catch (error) {
    console.log('AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAas')
    return error
  }
}

// export default pagarSuscripcion;

// const items = [{
//   title: "Dummy Title",
//   description: "Dummy description",
//   picture_url: "http://www.myapp.com/myimage.jpg",
//   category_id: 'categoria',
//   quantity: 1,
//   currency_id: "U$",
//   unit_price: 10,
// }];
// const config = {
//   method: "POST",
//   headers: {
//     Authorization: mercadopago,
//     "Content-Type": "application/json",
//   },
//   body: JSON.stringify(nuevaCaja),
// };

//       -d '{
//   "items": [
//     {
//       "title": "Dummy Title",
//       "description": "Dummy description",
//       "picture_url": "http://www.myapp.com/myimage.jpg",
//       "category_id": "car_electronics",
//       "quantity": 1,
//       "currency_id": "U$",
//       "unit_price": 10
//     }
//   ],
//   "payer": {
//     "phone": {},
//     "identification": {},
//     "address": {}
//   },
//   "payment_methods": {
//     "excluded_payment_methods": [
//       {}
//     ],
//     "excluded_payment_types": [
//       {}
//     ]
//   },
//   "shipments": {
//     "free_methods": [
//       {}
//     ],
//     "receiver_address": {}
//   },
//   "back_urls": {},
//   "differential_pricing": {},
//   "tracks": [
//     {
//       "type": "google_ad"
//     }
//   ],
//   "metadata": {}
// }'