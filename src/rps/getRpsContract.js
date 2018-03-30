import contract from 'truffle-contract'

import RpsContract from '../contracts/Rps.json'
import getWeb3 from '../utils/getWeb3'

const getRpsContract = async () => {
  const splitter = contract(RpsContract)
  const web3 = await getWeb3()
  splitter.setProvider(web3.currentProvider)

  // dirty hack for web3@1.0.0 support for localhost testrpc,
  // see https://github.com/trufflesuite/truffle-contract/issues/56#issuecomment-331084530
  if (typeof splitter.currentProvider.sendAsync !== 'function') {
    splitter.currentProvider.sendAsync = function() {
      return splitter.currentProvider.send.apply(splitter.currentProvider, arguments)
    }
  }

  return await splitter.deployed()
}

export default getRpsContract
