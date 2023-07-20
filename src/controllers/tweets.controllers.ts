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

export const getTweetController = async (req: Request, res: Response) => {
  const result = await tweetsService.increaseView(req.params.tweet_id, req.decoded_authorization?.user_id)
  const tweet = {
    ...req.tweet,
    guest_views: result.guest_views,
    user_views: result.user_views,
    updated_at: result.updated_at
  }
  return res.json({
    message: 'Get Tweet Successfully',
    result: tweet
  })
}
