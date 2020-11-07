import { Router } from 'express'
import {
  signup as signupRoute,
  signin as signinRoute,
  changeUser as changeUserRoute,
  auth as authRoute,
} from '../../shared/apiRoutes'
import authorize from '../middleware/authorizeMiddleware'
import signinController from '../controllers/signinController'
import signupController from '../controllers/signupController'
import authInfoController from '../controllers/authInfoController'
import changeUserController from '../controllers/changeUserController'

const api = Router()

api.post(signupRoute, signupController)

api.post(signinRoute, signinController)

api.get(authRoute, authorize, authInfoController)

api.post(changeUserRoute, authorize, changeUserController)

export default api
