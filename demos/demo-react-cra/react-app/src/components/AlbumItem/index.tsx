import * as React from "react";
import { IAlbum } from "../../types";

import "./style.css";
import deleteIcon from "../../assets/imgs/delete.png";

interface Props {
  album: IAlbum;
  onDelete: () => void;
}

export default class AlbumItem extends React.Component<Props> {
  render() {
    return (
      <div className="album">
        <div className="cover">
          <img src={this.props.album.cover} alt="" />
          <div className="mask">
            <img src={deleteIcon} onClick={this.props.onDelete} alt="" />
          </div>
        </div>
        <span className="title nowrap">{this.props.album.name}</span>
        <span>{this.props.album.singer}</span>
        <div>{this.props.album.release_time}</div>
      </div>
    );
  }
}
