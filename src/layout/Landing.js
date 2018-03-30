import React from 'react'
import { Nav, NavItem } from 'react-bootstrap'

import NavLink from './NavLink'
import './jumbotron-narrow.css'

const Landing = ({ children }) => (
  <div className="container">
    <div className="header clearfix">
      <Nav bsStyle="pills" className="pull-right">
        <NavLink exact to="/">
          Rock-Paper-Scissors
        </NavLink>
        <NavLink exact to="/splitter">
          Splitter
        </NavLink>
        <NavLink exact to="/about">
          About
        </NavLink>
        <NavItem href="https://github.com/gornostal/demo-dapps">
          <i className="fa fa-github" /> Github
        </NavItem>
      </Nav>
      <h3 className="text-muted">Demo ÐApps</h3>
    </div>

    {children}
  </div>
)

export default Landing
