import getWeb3 from '../utils/getWeb3'

export const getAccounts = async () => {
  const web3 = await getWeb3()
  return await web3.eth.getAccounts()
}
