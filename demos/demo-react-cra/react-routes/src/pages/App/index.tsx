import * as React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import './style.css'
import Nav from '../../components/Nav'
import Main from '../Main'
import About from '../About'
import Detail from '../Detail'
import NotFound from '../NotFound'

export default class App extends React.Component {

  render() {
    return (
      <BrowserRouter>
        <Nav />
        <div className="container">
          {/* 根据URL路径匹配路由组件，渲染到该位置 */}
          <Switch>
            <Route path="/" exact component={Main} />
            <Route path="/about" component={About} />
            <Route path="/detail/:id" component={Detail} />
            {/* 这是一个默认页面，如果前面的路由都没有被匹配到，就会渲染这个组件，相当于404，一定要放到最后 */}
            <Route component={NotFound} />
          </Switch>
        </div>
      </BrowserRouter>
    )
  }

}