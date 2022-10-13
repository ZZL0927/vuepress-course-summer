import * as React from 'react'
import { NavLink, withRouter, RouteComponentProps } from 'react-router-dom'

import './style.css'

class Nav extends React.Component<RouteComponentProps> {
  render() {
    return (
      <nav className="nav">
        <NavLink to="/" className="nav-item" exact activeClassName="nav-active">
          Main
        </NavLink>
        <NavLink to="/about" className="nav-item" activeClassName="nav-active">
          About
        </NavLink>
      </nav>
    )
  }
}

export default withRouter(Nav)
