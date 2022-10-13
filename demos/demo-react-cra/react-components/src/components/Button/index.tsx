import * as React from 'react'

import './style.css'

type ButtonType = 'default' | 'primary'

interface Props {
  type?: ButtonType
  onClick?: () => void
}

export default class Button extends React.Component<Props> {
  render() {
    let type = this.props.type || 'default'
    return (
      <button className={'button button-' + type} onClick={this.props.onClick}>
        {this.props.children}
      </button>
    )
  }
}
