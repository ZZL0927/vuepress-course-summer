import * as request from './request'
import { IArea, IAlbum } from '../types'

export function getAreas() {
  return request.get<IArea[]>('data/areas.json')
}

export function getAblums() {
  return request.get<IAlbum[]>('data/albums.json')
}