import * as React from 'react'

import style from './style.module.scss'

interface Props {
  visible: boolean
  title: string
  footer?: React.ReactNode
  onClose: () => void
}

export default class Modal extends React.Component<Props> {
  render() {
    let closeBtn = (
      <svg
        viewBox="64 64 896 896"
        focusable="false"
        data-icon="close"
        width="1em"
        height="1em"
        fill="currentColor"
        aria-hidden="true"
        className="modal-close"
        onClick={this.props.onClose}
      >
        <path d="M563.8 512l262.5-312.9c4.4-5.2.7-13.1-6.1-13.1h-79.8c-4.7 0-9.2 2.1-12.3 5.7L511.6 449.8 295.1 191.7c-3-3.6-7.5-5.7-12.3-5.7H203c-6.8 0-10.5 7.9-6.1 13.1L459.4 512 196.9 824.9A7.95 7.95 0 00203 838h79.8c4.7 0 9.2-2.1 12.3-5.7l216.5-258.1 216.5 258.1c3 3.6 7.5 5.7 12.3 5.7h79.8c6.8 0 10.5-7.9 6.1-13.1L563.8 512z"></path>
      </svg>
    )

    return (
      <div className={this.props.visible ? style.modal + ' ' + style.visible : style.modal}>
        <div className={style.mask} onClick={this.props.onClose} />
        <div className={style.box}>
          <div className={style.head}>
            <span>{this.props.title}</span>
            {closeBtn}
          </div>
          <div className={style.body}>{this.props.children}</div>
          <div className={style.footer}>{this.props.footer}</div>
        </div>
      </div>
    )
  }
}
