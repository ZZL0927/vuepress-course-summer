import { ISong } from './types.js'

interface Props {
  song: ISong
}

export default class SongItem extends React.Component<Props> {

  timeFormat(interval: number) {
    let minutes = Math.floor(interval / 60)
      .toString()
      .padStart(2, '0')
    let seconds = (interval % 60).toString().padStart(2, '0')
    return `${minutes}:${seconds}`
  }

  render() {
    let { song } = this.props
    return (
      <div className="song-item">
        <div className="cover-wrap">
          <img src={song.cover} className="cover-img" />
          <div className="cover-mask"></div>
          <img src="imgs/cover_play.png" className="cover-play" />
        </div>
        <div className="song-intro nowrap">
          <a href="#" className="song-name">{song.name}</a>
          <div className="song-singer nowrap">
            {song.singer.map((singer, index) => (
              <React.Fragment key={index}>
                <a href="#" className="song-singer">{singer}</a>
                {index !== song.singer.length - 1 && <i className="song-sep">/</i>}
              </React.Fragment>
            ))}
          </div>
        </div>
        <div>{this.timeFormat(song.interval)}</div>
      </div>
    )
  }

}