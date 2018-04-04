import React, { Component } from 'react'
import { compose } from 'redux'
import { Button, Alert } from 'react-bootstrap'
import { withRouter } from 'react-router-dom'

import withAsyncData from '../utils/withAsyncData'
import withGameStatus from './withGameStatus'
import { getReward, gameParameters, getWinnerAddress } from './rpsApi'

class RpsCollectReward extends Component {
  constructor(props) {
    super(props)
    this.reveal = this.reveal.bind(this)
  }

  getGameName() {
    return this.props.match.params.gameName
  }

  componentDidMount() {
    this.props.winnerAddress.load(this.getGameName())
  }

  componentWillReceiveProps(newProps) {
    if (newProps.getReward.data) {
      newProps.refreshGameStatus()
    }
  }

  reveal() {
    this.props.getReward.load(this.getGameName())
  }

  showResult(game) {
    const winnerAddress = this.props.winnerAddress.data
    if (!winnerAddress) {
      return <span>It's a tie.</span>
    }
    return game.account === winnerAddress ? <span>You Won!</span> : <span>Other player Won.</span>
  }

  render() {
    const { getReward } = this.props
    const game = gameParameters.get(this.getGameName())

    return (
      <div>
        <h2>Step 3 of 3. Get Your Reward</h2>
        {getReward.error && (
          <Alert bsStyle="warning">
            <strong>Error!</strong> <br /> {getReward.error + ''}
          </Alert>
        )}
        <p>{this.showResult(game)}</p>
        {getReward.data && <Alert bsStyle="success">Done</Alert>}
        <Button
          className="btn-lg"
          bsStyle="success"
          type="submit"
          onClick={this.reveal}
          disabled={getReward.pending || getReward.data || game.rewarded}
        >
          {getReward.pending && (
            <span>
              <i className="fa fa-spinner fa-spin" />&nbsp;
            </span>
          )}
          Get Reward
        </Button>
      </div>
    )
  }
}

export default compose(
  withRouter,
  withGameStatus,
  withAsyncData('winnerAddress', getWinnerAddress),
  withAsyncData('getReward', getReward)
)(RpsCollectReward)
