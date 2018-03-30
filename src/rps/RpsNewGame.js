import React from 'react'

import GameForm from './GameForm'

const RpsNewGame = () => (
  <div>
    <h2>New Game</h2>
    <GameForm newGame={true} />
  </div>
)

export default RpsNewGame
