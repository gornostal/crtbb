import React, { Component } from 'react'
import { HashRouter, Route, Switch } from 'react-router-dom'
import Helmet from 'react-helmet'

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
            <Route path="/" exact component={Rps} />
            <Route path="/splitter" exact component={Splitter} />
            <Route path="/about" exact component={About} />
          </Switch>
        </Landing>
      </HashRouter>
    )
  }
}

export default App
