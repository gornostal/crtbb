import 'bootstrap/dist/css/bootstrap.css'

import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { applyMiddleware, createStore } from 'redux'
import promiseMiddleware from 'redux-promise-middleware'
import { composeWithDevTools } from 'redux-devtools-extension'
import fontawesome from '@fortawesome/fontawesome'
import brands from '@fortawesome/fontawesome-free-brands'
import solid from '@fortawesome/fontawesome-free-solid'

import App from './app/App'
import reducer from './app/reducers'

fontawesome.library.add(brands, solid)

const store = createStore(reducer, composeWithDevTools(applyMiddleware(promiseMiddleware())))

const render = App => {
  ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.getElementById('root')
  )
}

render(App)

if (module.hot) {
  module.hot.accept('./app/App', () => {
    const NextApp = require('./app/App').default
    render(NextApp)
  })
}
