const api = require('express').Router()
const { signup: signupRoute, signin: signinRoute } = require('../../shared/apiRoutes')
const signinController = require('../controllers/signinController')
const signupController = require('../controllers/signupController')

api.post(signupRoute, signinController)

api.post(signinRoute, signupController)

module.exports = api
