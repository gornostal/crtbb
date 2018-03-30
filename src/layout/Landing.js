import React from 'react'
import { Nav, NavItem } from 'react-bootstrap'
import FontAwesomeIcon from '@fortawesome/react-fontawesome'

import NavLink from './NavLink'
import './jumbotron-narrow.css'

const Landing = ({ children }) => (
  <div className="container">
    <div className="header clearfix">
      <Nav bsStyle="pills" className="pull-right">
        <NavLink to="/rps">Rock-Paper-Scissors</NavLink>
        <NavLink to="/splitter">Splitter</NavLink>
        <NavLink exact to="/about">
          About
        </NavLink>
        <NavItem href="https://github.com/gornostal/demo-dapps">
          <FontAwesomeIcon icon={['fab', 'github']} /> Github
        </NavItem>
      </Nav>
      <h3 className="text-muted">Demo ÐApps</h3>
    </div>

    {children}
  </div>
)

export default Landing
