import React from 'react'
import { compose, bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import { actions } from './rpsActions'

/**
 * Provides refreshGameStatus() and gameStatus props
 */
export default function withGameStatus(WrappedComponent) {
  class WithGameStatus extends React.Component {
    constructor(props) {
      super(props)
      this.refreshGameStatus = this.refreshGameStatus.bind(this)
    }

    getGameName() {
      return this.props.match.params.gameName
    }

    refreshGameStatus() {
      this.props.actions.getGameStatus(this.getGameName())
    }

    render() {
      return (
        <WrappedComponent
          refreshGameStatus={this.refreshGameStatus}
          gameStatus={this.props.gameStatus}
          {...this.props}
        />
      )
    }
  }

  const mapStateToProps = state => ({
    gameStatus: state.rps.gameStatus
  })

  const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(actions, dispatch)
  })

  WithGameStatus.displayName = `WithGameStatus(${getDisplayName(WrappedComponent)})`

  return compose(withRouter, connect(mapStateToProps, mapDispatchToProps))(WithGameStatus)
}

function getDisplayName(WrappedComponent) {
  return WrappedComponent.displayName || WrappedComponent.name || 'Component'
}
