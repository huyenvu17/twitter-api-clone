import { ParamsDictionary } from 'express-serve-static-core'
import { Request, Response } from 'express'
import { TokenPayload } from '~/models/requests/User.requests'
import { LikeTweetReqBody } from '~/models/requests/Like.requests'
import likeTweetService from '~/services/likes.services'
import { LIKE_MESSAGES } from '~/constants/messages'

export const likeTweetController = async (req: Request<ParamsDictionary, any, LikeTweetReqBody>, res: Response) => {
  const { user_id } = req.decoded_authorization as TokenPayload
  const result = await likeTweetService.likeTweet(user_id, req.body.tweet_id)
  return res.json({
    message: LIKE_MESSAGES.LIKE_SUCCESSFULLY,
    result
  })
}

export const unlikeTweetController = async (req: Request, res: Response) => {
  const { user_id } = req.decoded_authorization as TokenPayload
  await likeTweetService.unlikeTweet(user_id, req.params.tweet_id)
  return res.json({
    message: LIKE_MESSAGES.UNLIKE_SUCCESSFULLY
  })
}
export const unlikeTweetByBookmarkIdController = async (req: Request, res: Response) => {
  await likeTweetService.unlikeTweetByLikeTweetId(req.params.like_id)
  return res.json({
    message: LIKE_MESSAGES.UNLIKE_SUCCESSFULLY
  })
}
