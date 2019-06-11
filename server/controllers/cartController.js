const swag = require('../models/swag')

module.exports = {
  add: (req, res) => {
    const { id } = req.params
    let { user } = req.session

    const index = user.cart.findIndex(swag => +swag.id === +id)

    if(index === -1){
      const pickSwag = swag.find(swag => +swag.id === +id)
      user.cart.push(pickSwag)
      user.total += pickSwag.price
    }
    res.send(user)
  },
  delete: (req, res) => {
    const { id } = req.params
    let { user } = req.session
    
    const index = user.cart.findIndex(swag => +swag.id === +id)
    const pickSwag = swag.find(swag => +swag.id === +id)

    if(index !== -1){
      user.cart.splice(index, 1)
      user.total -= pickSwag.price
    }
    res.send(user)
  },
  checkout: (req, res) => {
    const { user } = req.session
    user.cart = []
    user.total = 0
    res.send(user)
  }
}