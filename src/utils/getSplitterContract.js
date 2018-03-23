import contract from "truffle-contract"

import SplitterContract from "../../ethereum/build/contracts/Splitter.json"
import getWeb3 from "./getWeb3"

const getSplitterContract = async () => {
  const splitter = contract(SplitterContract)
  const web3 = await getWeb3()
  splitter.setProvider(web3.currentProvider)

  return await splitter.deployed()
}

export default getSplitterContract
