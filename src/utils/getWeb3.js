import Web3 from "web3"

var cachedWeb3 = null

const getWeb3 = () => {
  return new Promise(function(resolve, reject) {
    if (cachedWeb3) {
      resolve(cachedWeb3)
      return
    }

    // Wait for loading completion to avoid race conditions with web3 injection timing.
    window.addEventListener("load", function() {
      var web3 = window.web3

      // Checking if Web3 has been injected by the browser (Mist/MetaMask)
      if (typeof web3 !== "undefined") {
        // Use Mist/MetaMask's provider.
        cachedWeb3 = new Web3(web3.currentProvider)

        console.log("Injected web3 detected.")
      } else {
        // Fallback to localhost if no web3 injection. We've configured this to
        // use the development console's port by default.
        var provider = new Web3.providers.HttpProvider(process.env.REACT_DEV_WEB3_PROVIDER)

        cachedWeb3 = new Web3(provider)

        console.log("No web3 instance injected, using Local web3.")
      }

      resolve(cachedWeb3)
    })
  })
}

export default getWeb3
