import * as React from 'react'

interface Props {
  message: string
}

export default class LifeCircle extends React.Component<Props> {

  // 组件完成了更新
  componentDidUpdate(prevProps: Props) {
    console.log(prevProps)
    console.log('组件已经更新')
  }

  // 组件将要卸载
  componentWillUnmount() {
    console.log('组件将要卸载')
  }

  // 组件已经挂载到DOM中
  componentDidMount() {
    console.log('组件已经挂载')
  }

  render() {
    return <h1>LieftCircle</h1>
  }

}