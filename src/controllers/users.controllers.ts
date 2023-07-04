import { ParamsDictionary } from 'express-serve-static-core'
import { Request, Response } from 'express'
import User from '~/models/schemas/User.schema'
import databaseService from '~/services/database.services'
import usersService from '~/services/users.services'
import { RegisterReqBody } from '~/models/schemas/requests/User.requests'

export const loginController = (req: Request, res: Response) => {
  const { email, password } = req.body
  if (email === 'ab@gmail.com' && password === '123') {
    res.status(200).send({ message: 'Login Success' })
  }
  res.status(400).send({ message: 'Login Failure' })
}

export const registerController = async (req: Request<ParamsDictionary, any, RegisterReqBody>, res: Response) => {
  try {
    const result = await usersService.register(req.body)
    res.status(201).send({ message: 'Register Success', result })
  } catch (error) {
    res.status(400).send({ message: 'Register Failure' })
  }
}
