import * as request from './request.js'
import { IArea, IAlbum } from './types.js'
import AlbumItem from './AlbumItem.js'

interface State {
  areas: IArea[]
  albums: IAlbum[]
  currentArea: number
}

class App extends React.Component<any, State> {
  state: State = {
    areas: [],
    albums: [],
    currentArea: null
  }

  async load() {
    let [areas, albums] = await Promise.all([
      request.get<IArea[]>('data/areas.json'),
      request.get<IAlbum[]>('data/albums.json')
    ])
    this.setState({
      areas,
      albums,
      currentArea: areas[0].id
    })
  }

  changeTab(id: number) {
    this.setState({
      currentArea: id
    })
  }

  currentAlbums() {
    return this.state.albums.filter(
      album => album.area === this.state.currentArea
    )
  }

  deleteAlbum(album: IAlbum) {
    let index = this.state.albums.indexOf(album)
    this.state.albums.splice(index, 1)
    this.setState({
      albums: this.state.albums
    })
  }

  componentDidMount() {
    this.load()
  }

  render() {
    return (
      <React.Fragment>
        <header>
          <div className="header-inner">
            <img src="imgs/logo.png" />
          </div>
        </header>
        <main>
          <ul className="tabs">
            {this.state.areas.map(area => {
              let className = 'tab-item'
              if (area.id === this.state.currentArea) className += ' tab-active'
              return (
                <li
                  className={className}
                  key={area.id}
                  onClick={() => this.changeTab(area.id)}
                >
                  {area.name}
                </li>
              )
            })}
          </ul>
          <section className="list">
            {this.currentAlbums().map(album => (
              <AlbumItem
                key={album.id}
                album={album}
                onDelete={() => this.deleteAlbum(album)}
              />
            ))}
          </section>
        </main>
      </React.Fragment>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'))
