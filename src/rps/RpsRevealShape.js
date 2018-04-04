import React, { Component } from 'react'
import { compose } from 'redux'
import { Button, Alert } from 'react-bootstrap'
import { withRouter } from 'react-router-dom'
import FontAwesomeIcon from '@fortawesome/react-fontawesome'

import withAsyncData from '../utils/withAsyncData'
import withGameStatus from './withGameStatus'
import { revealShape, gameParameters } from './rpsApi'

class RpsRevealShape extends Component {
  constructor(props) {
    super(props)
    this.reveal = this.reveal.bind(this)
  }

  getGameName() {
    return this.props.match.params.gameName
  }

  componentWillReceiveProps(newProps) {
    if (newProps.revealShape.data) {
      newProps.refreshGameStatus()
    }
  }

  reveal() {
    this.props.revealShape.load(this.getGameName())
  }

  render() {
    const { revealShape } = this.props
    const game = gameParameters.get(this.getGameName())

    return (
      <div>
        <h2>Step 2 of 3. Reveal Your Shape</h2>
        <b>Account</b>: {game.account} <br />
        <b>Shape</b>: {game.shape} <br />
        <br />
        {revealShape.error && (
          <Alert bsStyle="warning">
            <strong>Error!</strong> <br /> {revealShape.error}
          </Alert>
        )}
        <Button className="btn-lg" bsStyle="success" type="submit" onClick={this.reveal} disabled={revealShape.pending}>
          {revealShape.pending && (
            <span>
              <FontAwesomeIcon icon="spinner" spin />{' '}
            </span>
          )}
          Submit
        </Button>
      </div>
    )
  }
}

export default compose(withRouter, withGameStatus, withAsyncData('revealShape', revealShape))(RpsRevealShape)
