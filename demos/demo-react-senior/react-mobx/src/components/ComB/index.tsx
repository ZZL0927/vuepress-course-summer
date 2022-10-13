import * as React from 'react'
import { observer } from 'mobx-react'

import store from '../../store'

@observer
export default class ComB extends React.Component {
  render() {
    return (
      <div>
        ComB: {store.username}{' '}
        <button onClick={() => store.setUsername('ComB')}>change</button>
      </div>
    )
  }
}
