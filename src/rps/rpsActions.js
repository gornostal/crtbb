import { combineReducers } from 'redux'
import makeTypesActionsReducer from '../utils/makeTypesActionsReducer'
import { getAccounts } from './rpsApi'

const { actions: getAccountsActions, reducer: accounts } = makeTypesActionsReducer('RPS/ACCOUNTS', getAccounts)

export const actions = {
  getAccounts: getAccountsActions.asyncRequest
}

export const reducer = combineReducers({
  accounts
})
