import React from 'react'
import { Button } from 'react-bootstrap'

import './RpsStep0.css'

const RpsStep0 = ({ history }) => (
  <div>
    <h2>Rock-Paper-Scissors</h2>

    <div className="start-buttons">
      <Button
        bsStyle="primary"
        bsSize="large"
        onClick={() => {
          history.push('/rps/new-game')
        }}
      >
        New Game
      </Button>
      <Button
        bsStyle="primary"
        bsSize="large"
        onClick={() => {
          history.push('/rps/join-game')
        }}
      >
        Join Game
      </Button>
    </div>
  </div>
)

export default RpsStep0
