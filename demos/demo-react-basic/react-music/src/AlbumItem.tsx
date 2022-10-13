import { IAlbum } from './types.js'

interface Props {
  album: IAlbum
  onDelete: () => void
}

export default class AlbumItem extends React.Component<Props> {
  render() {
    return (
      <div className="album">
        <div className="cover">
          <img src={this.props.album.cover} />
          <div className="mask">
            <img src="imgs/delete.png" onClick={this.props.onDelete} />
          </div>
        </div>
        <a className="title nowrap" href="#">
          {this.props.album.name}
        </a>
        <a href="#">{this.props.album.singer}</a>
        <div>{this.props.album.release_time}</div>
      </div>
    )
  }
}
