import { ObjectId } from 'mongodb'

import { ISinger } from '../models/types'
import * as db from '../db'
import { stats } from '../libs/stats'

/**
 * 查询歌手列表
 * @returns
 */
export async function list() {
  const items = await db.singers.find().toArray()
  return items
}

/**
 * 查询某个歌手
 * @param _id 
 * @returns 
 */
export async function detail(_id: string) {
  const record = await db.singers.findOne({
    _id: new ObjectId(_id)
  })
  if (!record) throw stats.ErrSingerNotFound
  return record
}

/**
 * 创建歌手
 * @param singer
 * @returns
 */
export async function create(singer: ISinger) {
  const result = await db.singers.insertOne(singer)
  return result.insertedId
}

/**
 * 删除歌手
 * @param _id
 */
export async function remove(_id: string) {
  const singerId = new ObjectId(_id)
  const songs = await db.songs.countDocuments({
    singerId
  })
  if (songs > 0) throw stats.ErrSongNotEmpty
  const result = await db.singers.findOneAndDelete({
    _id: singerId
  })
  if (!result.value) throw stats.ErrSingerNotFound
}

/**
 * 更新歌手
 * @param _id
 * @param singer
 */
export async function update(_id: string, singer: ISinger) {
  const singerId = new ObjectId(_id)
  const result = await db.singers.findOneAndUpdate(
    {
      _id: singerId
    },
    {
      $set: singer
    }
  )
  if (!result.value) throw stats.ErrSingerNotFound
}
