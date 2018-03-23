module.exports = {
  networks: {
    development: {
      // start with ./truffle.sh develop
      host: "127.0.0.1",
      port: 9545,
      network_id: "*" // Match any network id
    }
  }
}
