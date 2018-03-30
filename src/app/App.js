import React, { Component } from 'react'
import { HashRouter, Route, Switch, Redirect } from 'react-router-dom'
import Helmet from 'react-helmet'

import Page404 from '../layout/Page404'
import Landing from '../layout/Landing'
import Rps from '../rps/Rps'
import Splitter from '../splitter/Splitter'
import About from '../about/About'

class App extends Component {
  render() {
    return (
      <HashRouter>
        <Landing>
          <Helmet titleTemplate="%s &mdash; Demo ÐApps" />
          <Switch>
            <Route path="/" exact render={() => <Redirect to="/rps" />} />
            <Route path="/rps" component={Rps} />
            <Route path="/splitter" exact component={Splitter} />
            <Route path="/about" exact component={About} />
            <Route component={Page404} />
          </Switch>
        </Landing>
      </HashRouter>
    )
  }
}

export default App
