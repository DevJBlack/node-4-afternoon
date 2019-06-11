require('dotenv').config()
const express = require('express')
const session = require('express-session')
const checkForSession = require('./middlewares/checkForSession')
const swag = require('./controllers/swagController')
const auth = require('./controllers/authController')
const cart = require('./controllers/cartController')
const search = require('./controllers/searchController')

const { SERVER_PORT, SESSION_SECRET } = process.env

const app = express()
app.use(express.json())
app.use(session({
  secret: SESSION_SECRET,
  resave: false,
  saveUninitialized: false
}))

app.use(checkForSession)
app.use(express.static(`${__dirname}/../build`))

app.get('/api/swag', swag.read)
app.post('/api/login', auth.login)
app.post('/api/register', auth.register)
app.post('/api/signout', auth.signout)
app.get('/api/user', auth.getUser)
app.post('/api/cart/checkout', cart.checkout)
app.post('/api/cart/:id', cart.add)
app.delete('/api/cart/:id', cart.delete)
app.get('/api/search', search.search)

app.listen(SERVER_PORT, () => {
  console.log('listening on port', SERVER_PORT)
})