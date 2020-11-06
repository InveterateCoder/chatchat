const api = require('express').Router()
const {
  signup: signupRoute,
  signin: signinRoute,
  changeUser: changeUserRoute,
  auth: authRoute,
} = require('../../shared/apiRoutes')
const authorize = require('../middleware/authorizeMiddleware')
const signinController = require('../controllers/signinController')
const signupController = require('../controllers/signupController')
const authInfoController = require('../controllers/authInfoController')
const changeUserController = require('../controllers/changeUserController')

api.post(signupRoute, signupController)

api.post(signinRoute, signinController)

api.get(authRoute, authorize, authInfoController)

api.post(changeUserRoute, authorize, changeUserController)

export default api
