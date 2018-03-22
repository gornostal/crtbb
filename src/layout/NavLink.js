import React, { Component } from "react"
import { Link, withRouter, matchPath } from "react-router-dom"

class NavLink extends Component {
  render() {
    const isActive = matchPath(this.props.location.pathname, {
      path: this.props.to,
      exact: this.props.exact
    })
    const className = isActive ? "active" : ""
    const linkProps = {
      title: this.props.title,
      to: this.props.to,
      replace: this.props.replace,
      children: this.props.children
    }

    if (this.props.visible !== undefined && !this.props.visible) {
      return null
    }

    return (
      <li className={className}>
        <Link {...linkProps} />
      </li>
    )
  }
}

export default withRouter(NavLink)
