const swag = require('../models/swag')

module.exports = {
  search: (req, res) => {
    const { category } = req.query;
    if (!category) {
      res.status(200).send(swag)
    } else {
      const searchSwag = filter(ele => ele.category === category)
      res.send(searchSwag)
    }
  }
}