import * as React from 'react'
import { RouteComponentProps, Link } from 'react-router-dom'

export default class About extends React.Component<RouteComponentProps> {

  render() {
    return (
      <>
        <h1>About</h1>
        <Link to="/">Main</Link>
      </>
    )
  }

}