/* global artifacts, contract, assert, web3 */
var Splitter = artifacts.require("Splitter.sol")

contract("Splitter", accounts => {
  it("should be deployed with owner == accounts[0]", async () => {
    const splitter = await Splitter.deployed()
    const owner = await splitter.owner.call()
    assert.equal(owner, accounts[0], "Contract wasn't deployed correctly")
  })

  it("adds participants", async () => {
    const splitter = await Splitter.new()
    const tx = await splitter.addParticipants(accounts[1], accounts[2], accounts[3])
    assert.equal(parseInt(tx.receipt.status, 16), 1, "Participants couldn't be added")
    assert.equal((await splitter.participants.call(1))[0], accounts[2], "Account addresses don't match")
  })

  it("splits ether among two remaining participants", async () => {
    const splitter = await Splitter.new()
    await splitter.addParticipants(accounts[1], accounts[2], accounts[3])
    const initialBalance = web3.fromWei(await web3.eth.getBalance(accounts[2]), "ether")
    const tx = await splitter.pay({ from: accounts[1], value: web3.toWei(2, "ether") })
    assert.equal(parseInt(tx.receipt.status, 16), 1, "Payment failed")
    const newBalance = web3.fromWei(await web3.eth.getBalance(accounts[2]), "ether")
    assert.equal(newBalance - initialBalance, 1, "Incorrect amount transfered")
  })
})
