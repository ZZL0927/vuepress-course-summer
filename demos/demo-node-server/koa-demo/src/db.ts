import { MongoClient, Collection } from 'mongodb'
import { ISinger, ISong } from './models/types'

export let singers: Collection<ISinger>
export let songs: Collection<ISong>

export async function init() {
  const client = new MongoClient(process.env.MONGO_URL)
  await client.connect()
  const db = client.db()
  singers = db.collection('singers')
  songs = db.collection('songs')
  // 可以创建唯一索引
  singers.createIndex({
    name: 1
  }, {
    unique: true
  })
}
