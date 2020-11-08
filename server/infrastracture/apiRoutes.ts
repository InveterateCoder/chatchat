import { Router } from 'express'
import {
  signup as signupRoute,
  signin as signinRoute,
} from '../../shared/apiRoutes'
import signinController from '../controllers/signinController'
import signupController from '../controllers/signupController'

const api = Router()

api.post(signupRoute, signupController)

api.post(signinRoute, signinController)

export default api
