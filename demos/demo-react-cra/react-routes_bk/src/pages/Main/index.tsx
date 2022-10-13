import * as React from 'react'
import { RouteComponentProps, Link } from 'react-router-dom'

export default class Main extends React.Component<RouteComponentProps> {

  onClick() {
    console.log(this.props)
  }

  navigae() {
    this.props.history.push('/about')
  }

  render() {
    return (
      <>
        <h1>Main</h1>
        <p>
          <Link to="/about">About</Link>
        </p>
        <p>
          使用Link组件替代a标签进行路由的导航可以拦截用户的点击事件，然后通过 `history.pushState` 添加浏览器的历史状态，更新url的同时又不会引起页面的刷新
        </p>
        <p>
          <a href="/about">普通a标签会导致页面刷新</a>
        </p>
        <p>
          <button onClick={this.onClick.bind(this)}>查看传入的props</button>
          <button onClick={this.navigae.bind(this)}>通过API导航</button>
        </p>
        <p>
          <Link to="/detail/1">带参数的路由</Link>
        </p>
        <p>
          <Link to="/hello">不存在的地址，响应404错误页面</Link>
        </p>
      </>
    )
  }

}