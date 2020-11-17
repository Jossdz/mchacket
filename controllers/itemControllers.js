const Item = require('../models/Item')
const mercadopago = require('../config/mercadopago')


exports.itemDetails = async (req, res) => {
  const item = await Item.findById(req.params.itemId)
  // Generamos la preferencia que describe el elemento que mercadopago va a procesar
  const preference = {
    items: [
      {
        title: item.name,
        unit_price: Number(item.price/100),
        currency_id: 'USD',
        quantity: 1
      }
    ],
    notification_url: 'https://webhook.site/88151d93-fd67-40d5-87f1-46b71cf8cae8'
  }

  // MP nos ayuda a generar el token que identifica a la transaccion de este producto para enviarlo al checkout pro
  const response = await mercadopago.preferences.create(preference)
  

  item.formatedPrice = `$${(item.price/100).toFixed(2)} USD`

  item.prefenceId = response.body.id



  res.render('items/detail', item)
}