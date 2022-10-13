require('dotenv').config()
const { MongoClient } = require('mongodb')
const singerRows = require('./singers.json')
const songRows = require('./songs.json')

async function start() {
  const client = new MongoClient(process.env.MONGO_URL)
  await client.connect()
  const db = client.db()
  const singers = db.collection('singers')
  const songs = db.collection('songs')
  for (const singer of singerRows) {
    const result = await singers.insertOne({
      name: singer.name,
      birthday: singer.birthday,
      pic: singer.pic
    })
    singer._id = result.insertedId
  }
  for (const song of songRows) {
    const singerId = singerRows.find(item => item.id === song.singerId)._id
    const obj = {
      title: song.title,
      subtitle: song.subtitle,
      singerId,
      cover: song.cover,
      interval: song.interval,
      status: 1,
      createdAt: Date.now()
    }
    await songs.insertOne(obj)
  }
  client.close()
}

start()
