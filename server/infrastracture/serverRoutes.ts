const server = require('express').Router()
const avatarController = require('../controllers/avatarController')
const renderController = require('../controllers/renderController')

server.get('/avatar/:id', avatarController)

server.use(renderController)

export default server
