import { ParamsDictionary } from 'express-serve-static-core'
import { Request, Response } from 'express'
import { TweetReqBody } from '~/models/requests/Tweet.requests'
import { TokenPayload } from '~/models/requests/User.requests'
import tweetsService from '~/services/tweets.services'
import { TWEETS_MESSAGES } from '~/constants/messages'

export const createTweetController = async (req: Request<ParamsDictionary, any, TweetReqBody>, res: Response) => {
  const { user_id } = req.decoded_authorization as TokenPayload
  const result = await tweetsService.createTweetController(user_id, req.body)
  return res.json({
    message: TWEETS_MESSAGES.TWEET_SUCCESSFULLY,
    result
  })
}
