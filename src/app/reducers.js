import { combineReducers } from 'redux'
import { reducer as form } from 'redux-form'

import { reducer as splitter } from '../splitter/splitterActions'

const appReducer = combineReducers({
  form,
  splitter
})

export default appReducer
