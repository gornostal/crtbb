import Web3 from 'web3'

var cachedWeb3 = null

const getWeb3 = () => {
  if (cachedWeb3) {
    return cachedWeb3
  }

  // Checking if Web3 has been injected by the browser (Mist/MetaMask)
  if (typeof window.web3 !== 'undefined' && process.env.REACT_APP_USE_DEV_PROVIDER !== 'true') {
    // Use Mist/MetaMask's provider.
    cachedWeb3 = new Web3(window.web3.currentProvider)

    console.log('Injected web3 detected.')
  } else {
    // Fallback to localhost if no web3 injection
    // Run "./truffle.sh develop" to start a test node and JSON RPC
    var provider = new Web3.providers.HttpProvider(process.env.REACT_APP_DEV_WEB3_PROVIDER)

    cachedWeb3 = new Web3(provider)

    console.log(`No web3 instance injected, using Local web3 at ${process.env.REACT_APP_DEV_WEB3_PROVIDER}`)
  }

  return cachedWeb3
}

export default getWeb3
