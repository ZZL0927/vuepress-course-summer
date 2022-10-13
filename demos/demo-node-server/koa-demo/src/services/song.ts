import { ObjectId, Filter } from 'mongodb'

import { ISong, SongStatus } from '../models/types'
import * as db from '../db'
import { stats } from '../libs/stats'

interface ListFilter {
  title?: string
  singerId?: string
}

/**
 * 查询歌曲列表
 * @param filter
 * @param skip
 * @param limit
 * @returns
 */
export async function list(filter: ListFilter = {}, skip = 0, limit = 10) {
  const match: Filter<ISong> = {
    status: SongStatus.Normal
  }
  if (filter.title) match.title = new RegExp(filter.title)
  if (filter.singerId) match.singerId = new ObjectId(filter.singerId)
  const items = await db.songs
    .aggregate([
      {
        $match: match
      },
      {
        $lookup: {
          from: 'singers',
          localField: 'singerId',
          foreignField: '_id',
          as: '_singer'
        }
      },
      {
        $unwind: {
          path: '$_singer',
          preserveNullAndEmptyArrays: true
        }
      },
      {
        $addFields: {
          'singer._id': '$_singer._id',
          'singer.name': '$_singer.name'
        }
      },
      {
        $skip: skip
      },
      {
        $limit: limit
      },
      {
        $project: {
          singerId: 0,
          _singer: 0
        }
      }
    ])
    .toArray()
  const total = await db.songs.countDocuments(match)
  return {
    items,
    total
  }
}

/**
 * 创建歌曲
 * @param record 
 * @returns 
 */
export async function create(record: ISong) {
  const singerId = new ObjectId(record.singerId)
  const singer = await db.singers.findOne({
    _id: singerId
  })
  if (!singer) throw stats.ErrSingerNotFound
  const result = await db.songs.insertOne(record)
  return result.insertedId
}

/**
 * 删除歌曲
 * @param _id 
 */
export async function remove(_id: string) {
  const result = await db.songs.findOneAndDelete({
    _id: new ObjectId(_id)
  })
  if (!result.value) throw stats.ErrSongNotFound
}

/**
 * 更新歌曲
 * @param _id 
 * @param record 
 */
export async function update(_id: string, record: ISong) {
  const songId = new ObjectId(_id)
  const song = await db.songs.findOne({
    _id: songId
  })
  if (!song) throw stats.ErrSongNotFound
  if (record.singerId) {
    record.singerId = new ObjectId(record.singerId)
    const singer = await db.singers.findOne({
      _id: record.singerId
    })
    if (!singer) throw stats.ErrSingerNotFound
  }
  await db.songs.updateOne(
    {
      _id: songId
    },
    {
      $set: record
    }
  )
}
