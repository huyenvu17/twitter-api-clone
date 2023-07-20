import { config } from 'dotenv'

import databaseService from './database.services'
import { ObjectId, WithId } from 'mongodb'
import Like from '~/models/schemas/Like.schema'
config()

class LikesService {
  async likeTweet(user_id: string, tweet_id: string) {
    const result = await databaseService.likes.findOneAndUpdate(
      {
        user_id: new ObjectId(user_id),
        tweet_id: new ObjectId(tweet_id)
      },
      {
        $setOnInsert: new Like({
          user_id: new ObjectId(user_id),
          tweet_id: new ObjectId(tweet_id)
        })
      },
      {
        upsert: true,
        returnDocument: 'after'
      }
    )
    return result.value as WithId<Like>
  }
  async unlikeTweet(user_id: string, tweet_id: string) {
    const result = await databaseService.likes.findOneAndDelete({
      user_id: new ObjectId(user_id),
      tweet_id: new ObjectId(tweet_id)
    })
    return result.value as WithId<Like>
  }
  async unlikeTweetByLikeTweetId(like_id: string) {
    const result = await databaseService.likes.findOneAndDelete({
      _id: new ObjectId(like_id)
    })
    return result
  }
}

const likeTweetService = new LikesService()
export default likeTweetService
