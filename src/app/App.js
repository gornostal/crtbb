import React, { Component } from "react"
import { BrowserRouter, Route, Switch } from "react-router-dom"
import Helmet from "react-helmet"

import Landing from "../layout/Landing"
import Splitter from "../splitter/Splitter"
import About from "../about/About"

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Landing>
          <Helmet titleTemplate="%s &mdash; Demo ÐApps" />
          <Switch>
            <Route path="/" exact component={Splitter} />
            <Route path="/about" exact component={About} />
          </Switch>
        </Landing>
      </BrowserRouter>
    )
  }
}

export default App
