import { combineReducers } from "redux"
import makeTypesActionsReducer from "../utils/makeTypesActionsReducer"
import { getAccounts } from "./splitterApi"

const { actions: getAccountsActions, reducer: accounts } = makeTypesActionsReducer("SPLITTER/ACCOUNTS", getAccounts)

export const actions = {
  getAccounts: getAccountsActions.asyncRequest
}

export const reducer = combineReducers({
  accounts
})
