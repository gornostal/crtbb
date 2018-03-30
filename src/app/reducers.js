import { combineReducers } from 'redux'
import { reducer as form } from 'redux-form'

import { reducer as rps } from '../rps/rpsActions'
import { reducer as splitter } from '../splitter/splitterActions'

const appReducer = combineReducers({
  form,
  rps,
  splitter
})

export default appReducer
