import React from "react"
import { Nav } from "react-bootstrap"

import NavLink from "./NavLink"
import "./jumbotron-narrow.css"

const Landing = ({ children }) => (
  <div className="container">
    <div className="header clearfix">
      <Nav bsStyle="pills" className="pull-right">
        <NavLink exact to="/">
          Splitter
        </NavLink>
        <NavLink exact to="/about">
          About
        </NavLink>
      </Nav>
      <h3 className="text-muted">Splitter App</h3>
    </div>

    {children}
  </div>
)

export default Landing
