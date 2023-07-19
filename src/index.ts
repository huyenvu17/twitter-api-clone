import express from 'express'
import databaseService from './services/database.services'
import { defaultErrorHandler } from './middlewares/errors.middlewares'
import usersRouter from './routes/users.routes'
import tweetsRouter from './routes/tweets.routes'

const app = express()
const port = 4000

app.use(express.json())
app.use('/users', usersRouter)
app.use('/tweets', tweetsRouter)
databaseService.connect().then(() => {
  databaseService.indexUsers()
  databaseService.indexRefreshTokens()
  databaseService.indexFollowers()
})
app.use(defaultErrorHandler)
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
