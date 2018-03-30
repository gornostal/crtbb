import getWeb3 from '../utils/getWeb3'
import getSplitterContract from './getSplitterContract'
import { SubmissionError } from 'redux-form'

export const split = async (fromAccount, ethValue, address1, address2) => {
  const ethValueFloat = parseFloat(ethValue)
  const errors = {}
  if (!ethValueFloat || ethValueFloat === 0) {
    errors.ethValue = 'ETH must be > 0'
  }
  if (!fromAccount) {
    errors.fromAccount = 'Select your account'
  }
  if (!address1) {
    errors.address1 = 'This must be a valid Ethereum address'
  }
  if (!address2) {
    errors.address2 = 'This must be a valid Ethereum address'
  }
  if (Object.keys(errors).length > 0) {
    throw new SubmissionError({ ...errors, _error: 'Please fix the errors' })
  }

  const splitter = await getSplitterContract()
  const web3 = await getWeb3()
  const tx = await splitter.pay(address1, address2, {
    from: fromAccount,
    value: web3.utils.toWei(ethValue, 'ether')
  })
  if (parseInt(tx.receipt.status, 16) !== 1) {
    console.log('tx', tx)
    throw new SubmissionError({ _error: 'Transaction error. Check the logs' })
  }
}

export const getAccounts = async () => {
  const web3 = await getWeb3()
  return await web3.eth.getAccounts()
}
