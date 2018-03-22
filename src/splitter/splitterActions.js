import { combineReducers } from "redux"
import makeTypesActionsReducer from "../utils/makeTypesActionsReducer"

function sendMoney(ethValue, address1, address2) {
  return new Promise(resolve => {
    setTimeout(resolve, 1e3)
  })
}

const { actions: sendMoneyActions, reducer: send } = makeTypesActionsReducer("SPLITTER/SEND", sendMoney)

export const actions = {
  sendMoney: sendMoneyActions
}

export const reducer = combineReducers({
  send
})
