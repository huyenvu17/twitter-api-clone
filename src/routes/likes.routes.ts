import { unlikeTweetByBookmarkIdController } from './../controllers/likes.controllers'
import { Router } from 'express'
import { likeTweetController, unlikeTweetController } from '~/controllers/likes.controllers'
import { accessTokenValidator, verifiedUserValidator } from '~/middlewares/users.middlewares'
import { wrapRequestHandler } from '~/utils/handlers'

const likesRouter = Router()

likesRouter.post('/', accessTokenValidator, verifiedUserValidator, wrapRequestHandler(likeTweetController))
likesRouter.delete(
  '/tweet/:tweet_id',
  accessTokenValidator,
  verifiedUserValidator,
  wrapRequestHandler(unlikeTweetController)
)
likesRouter.delete(
  '/:like_id',
  accessTokenValidator,
  verifiedUserValidator,
  wrapRequestHandler(unlikeTweetByBookmarkIdController)
)
export default likesRouter
