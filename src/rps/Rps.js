import React from 'react'
import { Route, Switch } from 'react-router-dom'
import Helmet from 'react-helmet'

import Page404 from '../layout/Page404'
import RpsStep0 from './RpsStep0'
import RpsNewGame from './RpsNewGame'

const Rps = () => (
  <div className="jumbotron">
    <Helmet>
      <title>Rock-Paper-Scissors</title>
    </Helmet>

    <Switch>
      <Route path="/rps" exact component={RpsStep0} />
      <Route path="/rps/new-game" component={RpsNewGame} />
      <Route component={Page404} />
    </Switch>
  </div>
)

export default Rps
