import { Router } from 'express'
import {
  loginController,
  logoutController,
  registerController,
  verifyEmailController
} from '~/controllers/users.controllers'
import {
  accessTokenValidator,
  emailVerifyTokenValidator,
  loginValidator,
  refreshTokenValidator,
  registerValidator
} from '~/middlewares/users.middlewares'
import { wrapRequestHandler } from '~/utils/handlers'

const usersRouter = Router()
/**
 * Description. Login user
 * Path: /login
 * Method: POST
 * Body: { email:string, password:string }
 */
usersRouter.post('/login', loginValidator, wrapRequestHandler(loginController))
/**
 * Description. Register a new user
 * Path: /register
 * Method: POST
 * Body: {name: string, email:string, password:string, confirm_password: string, date_of_birth: ISO8601}
 */
usersRouter.post('/register', registerValidator, wrapRequestHandler(registerController))
/**
 * Description. Logout a user
 * Path: /logout
 * Method: POST
 * Header: {Authorization: Bearer <access_token> }
 * Body: { refresh_token: string }
 */
usersRouter.post('/logout', accessTokenValidator, refreshTokenValidator, wrapRequestHandler(logoutController))
usersRouter.post('/verify-email', emailVerifyTokenValidator, wrapRequestHandler(verifyEmailController))

export default usersRouter
