import React from 'react'
import { Button, FormControl } from 'react-bootstrap'

import withGameStatus from './withGameStatus'

const WaitForOtherPlayer = ({ refreshGameStatus, waitToRevealShape }) => (
  <div>
    <h2>Waiting for the other player...</h2>
    {!waitToRevealShape && (
      <div>
        <p>Please share this link with other player and wait until he makes his choice.</p>

        <p>
          <FormControl readOnly type="text" value={window.location.href} />
        </p>
      </div>
    )}

    <Button className="btn-lg" bsStyle="success" type="submit" onClick={refreshGameStatus}>
      Refresh
    </Button>
  </div>
)

export default withGameStatus(WaitForOtherPlayer)
