import { Router } from 'express'
import avatarController from '../controllers/avatarController'
import renderController from '../controllers/renderController'

const server = Router()

server.get('/avatar/:id', avatarController)

server.use(renderController)

export default server
