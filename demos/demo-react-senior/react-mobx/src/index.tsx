import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { observer } from 'mobx-react'

import store from './store'
import ComA from './components/ComA'
import ComB from './components/ComB'

@observer
class App extends React.Component {

  render() {
    return (
      <div>
        <ComA />
        <ComB />
        <p>index: {store.username}</p>
        <div>
          <button
            onClick={() => store.setUsername('index')}
          >
            修改username
          </button>
        </div>
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'))
