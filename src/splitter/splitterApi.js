import getWeb3 from "../utils/getWeb3"


export const split = async (ethValue, account1, account2) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve("hello")
    }, 1e3)
  })
}

export const getAccounts = async () => {
  const web3 = await getWeb3()
  return await web3.eth.getAccounts()
}
