import * as React from 'react'

import style from './style.module.scss'

type ButtonType = 'default' | 'primary'

interface Props {
  type?: ButtonType
  onClick?: () => void
}

export default class Button extends React.Component<Props> {
  render() {
    let type = this.props.type || 'default'
    return (
      <button className={style.button + ' ' + style[type]} onClick={this.props.onClick}>
        {this.props.children}
      </button>
    )
  }
}
