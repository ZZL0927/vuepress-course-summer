import * as React from 'react'

import './style.css'
import Button from '../../components/Button'
import Modal from '../../components/Modal'

interface State {
  visible: boolean
}

export default class App extends React.Component<any, State> {
  state: State = {
    visible: false
  }

  render() {
    return (
      <React.Fragment>
        <div className="btns">
          <Button>默认按钮</Button>
          <Button type="primary">主按钮</Button>
          <Button type="primary">主按钮主按钮</Button>
          <Button
            type="primary"
            onClick={() => this.setState({ visible: true })}
          >
            打开对话框
          </Button>
        </div>
        <Modal
          visible={this.state.visible}
          title="窗口标题"
          onClose={() => this.setState({ visible: false })}
          footer={[
            <Button key="cancel" onClick={() => this.setState({ visible: false })}>
              取消
            </Button>,
            <Button
              key="ok"
              type="primary"
              onClick={() => this.setState({ visible: false })}
            >
              确认
            </Button>
          ]}
        >
          <p>Some contents...</p>
          <p>Some contents...</p>
          <p>Some contents...</p>
        </Modal>
      </React.Fragment>
    )
  }
}
