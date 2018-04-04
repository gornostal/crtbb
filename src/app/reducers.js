import { combineReducers } from 'redux'
import { reducer as form } from 'redux-form'

import { reducer as splitter } from '../splitter/splitterActions'
import { reducer as rps } from '../rps/rpsActions'

const appReducer = combineReducers({
  form,
  rps,
  splitter
})

export default appReducer
