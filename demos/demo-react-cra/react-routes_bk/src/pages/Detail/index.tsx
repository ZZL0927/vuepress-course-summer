import * as React from 'react'
import { RouteComponentProps } from 'react-router-dom'

interface Params {
  xxx: string
  id:string
}

type Props = RouteComponentProps<Params>

export default class Detail extends React.Component<Props> {

  update() {
    let id = Number.parseInt(this.props.match.params.id) + 1
    this.props.history.push('/detail/' + id)
  }

  // 参数更新之后会调用该方法
  componentDidUpdate(prevProps: Props) {
    // 判断id是否发生了变化，因为如果有其他状态的改变也会引起更新
    if (this.props.match.params.id !== prevProps.match.params.id) {
      console.log('id发生了变化', this.props.match.params.id)
    }
  }

  render() {
    return (
      <>
        <h1>带参数的路由</h1>
        <p>
          id: {this.props.match.params.id}
        </p>
        <p>
          <button onClick={this.update.bind(this)}>更新路由参数</button>
        </p>
      </>
    )
  }

}