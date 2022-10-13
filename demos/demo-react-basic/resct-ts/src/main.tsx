import * as request from './request.js'
import { ISong } from './types.js'
import SongItem from './SongItem.js'

interface State {
  songs: ISong[]
}

class App extends React.Component<any, State> {

  state: State = {
    songs: []
  }

  async getData() {
    let songs = await request.get<ISong[]>('data/songs.json')
    this.setState({
      songs
    })
  }

  componentDidMount() {
    this.getData()
  }

  render() {
    return (
      <main>
        <section>
          <div className="songlist">
            {this.state.songs.map((song, index) => <SongItem key={index} song={song} />)}
          </div>
        </section>
      </main>
    )
  }

}

ReactDOM.render(<App />, document.getElementById('app'))