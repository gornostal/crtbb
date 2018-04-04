import React, { Component } from 'react'
import { compose } from 'redux'
import { Button, Alert } from 'react-bootstrap'
import { withRouter } from 'react-router-dom'
import FontAwesomeIcon from '@fortawesome/react-fontawesome'

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

  getResult(game) {
    const winnerAddress = this.props.winnerAddress.data
    if (!winnerAddress || winnerAddress === '0x0000000000000000000000000000000000000000') {
      return 'tie'
    }
    return game.account.toLowerCase() === winnerAddress.toLowerCase() ? 'winner' : 'looser'
  }

  render() {
    const { getReward } = this.props
    const game = gameParameters.get(this.getGameName())
    const result = this.getResult(game)

    return (
      <div>
        <h2>Step 3 of 3. Get Your Reward</h2>
        {getReward.error && (
          <Alert bsStyle="warning">
            <strong>Error!</strong> <br /> {getReward.error + ''}
          </Alert>
        )}
        <p>
          {result === 'tie' && <span>It's a tie</span>}
          {result === 'winner' && <span>You won! 🎉</span>}
          {result === 'looser' && (
            <span>
              The other player won{' '}
              <span role="img" aria-labelledby="Sad">
                😢
              </span>
            </span>
          )}
        </p>
        {game.rewarded && <Alert bsStyle="success">Your reward has been transfered to your account</Alert>}
        {result !== 'looser' &&
          !game.rewarded && (
            <Button
              className="btn-lg"
              bsStyle="success"
              type="submit"
              onClick={this.reveal}
              disabled={getReward.pending || getReward.data || game.rewarded}
            >
              {getReward.pending && (
                <span>
                  <FontAwesomeIcon icon="spinner" spin />{' '}
                </span>
              )}
              {result === 'tie' ? 'Get Your Money Back' : 'Get Reward'}
            </Button>
          )}
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
