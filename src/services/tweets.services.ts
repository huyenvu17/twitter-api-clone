import { config } from 'dotenv'

import axios from 'axios'
import databaseService from './database.services'
import { TweetReqBody } from '~/models/requests/Tweet.requests'
import Tweet from '~/models/schemas/Tweet.schema'
import { ObjectId } from 'mongodb'
config()

class TweetsService {
  async createTweetController(user_id: string, body: TweetReqBody) {
    const result = await databaseService.tweets.insertOne(
      new Tweet({
        audience: body.audience,
        content: body.content,
        hashtags: [],
        mentions: body.mentions,
        medias: body.medias,
        parent_id: body.parent_id,
        type: body.type,
        user_id: new ObjectId(user_id)
      })
    )
    const tweet = await databaseService.tweets.findOne({ _id: result.insertedId })
    return tweet
  }
}

const tweetsService = new TweetsService()
export default tweetsService
