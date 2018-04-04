import React, { Component } from 'react'
import { Alert } from 'react-bootstrap'

import { GameStatus, gameParameters } from './rpsApi'
import withGameStatus from './withGameStatus'
import RpsNewGame from './RpsNewGame'
import RpsJoinGame from './RpsJoinGame'
import RpsRevealShape from './RpsRevealShape'
import WaitForOtherPlayer from './WaitForOtherPlayer'
import RpsCollectReward from './RpsCollectReward'

class RpsGameWizard extends Component {
  componentWillMount() {
    this.props.refreshGameStatus()
  }

  getGameName() {
    return this.props.match.params.gameName
  }

  render() {
    const { gameStatus } = this.props
    const game = gameParameters.get(this.getGameName())

    if (gameStatus.fetching || !gameStatus.payload) {
      return <p className="text-muted">Loading...</p>
    }

    if (gameStatus.error) {
      return (
        <Alert bsStyle="warning">
          <strong>Error!</strong> <br /> {gameStatus.error}
        </Alert>
      )
    }

    if (gameStatus.payload) {
      const gameStatusNumber = gameStatus.payload.toNumber()
      switch (gameStatusNumber) {
        case GameStatus.notStarted:
          return <RpsNewGame />
        case GameStatus.choosing:
          return game ? <WaitForOtherPlayer /> : <RpsJoinGame />
        case GameStatus.revealing:
          if (game) {
            return game.revealed ? <WaitForOtherPlayer waitToRevealShape /> : <RpsRevealShape />
          } else {
            return <p>This game is in progress, but your are not participating in it.</p>
          }
        case GameStatus.player1Won:
          return game ? <RpsCollectReward /> : <h2>Player 1 Won</h2>
        case GameStatus.player2Won:
          return game ? <RpsCollectReward /> : <h2>Player 2 Won</h2>
        case GameStatus.tie:
          return game ? <RpsCollectReward /> : <h2>It's a Tie</h2>
        default:
          return <p>Error. Unexpected game status {gameStatusNumber}</p>
      }
    }
  }
}

export default withGameStatus(RpsGameWizard)
