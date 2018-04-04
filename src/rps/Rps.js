import React from 'react'
import { Route, Switch } from 'react-router-dom'
import Helmet from 'react-helmet'

import Page404 from '../layout/Page404'
import RpsEnterGameName from './RpsEnterGameName'
import RpsGameWizard from './RpsGameWizard'

const Rps = () => (
  <div className="jumbotron">
    <Helmet>
      <title>Rock-Paper-Scissors</title>
    </Helmet>

    <Switch>
      <Route path="/rps" exact component={RpsEnterGameName} />
      <Route path="/rps/game/:gameName" component={RpsGameWizard} />
      <Route component={Page404} />
    </Switch>
  </div>
)

export default Rps
