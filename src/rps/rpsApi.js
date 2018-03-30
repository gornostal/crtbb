import getWeb3 from '../utils/getWeb3'
import getRpsContract from './getRpsContract'
import { SubmissionError } from 'redux-form'

const shapes = {
  rock: '0',
  paper: '1',
  scissors: '2'
}

export const GameStatus = {
  notStarted: 0,
  choosing: 1,
  revealing: 2,
  player1Won: 3,
  player2Won: 4,
  tie: 5
}

export const getGameStatus = async gameNameHex => {
  const rps = await getRpsContract()
  return await rps.getGameStatus(gameNameHex)
}

export const getAccounts = async () => {
  const web3 = await getWeb3()
  return await web3.eth.getAccounts()
}

export const startGame = async formData => {
  const errors = {}
  if (!formData.fromAccount) {
    errors.fromAccount = 'Select your account'
  }
  if (!formData.gameName) {
    errors.gameName = 'Game name cannot be empty'
  }
  if (!formData.bet) {
    errors.bet = 'Bet cannot be empty'
  }
  if (isNaN(Number(formData.bet))) {
    errors.bet = 'Bet must be a valid number of Ether'
  }
  if (['rock', 'paper', 'scissors'].indexOf(formData.shape) === -1) {
    errors.shape = 'Please pick a hand shape'
  }

  if (Object.keys(errors).length > 0) {
    throw new SubmissionError({ ...errors, _error: 'Please fix the errors' })
  }

  const web3 = await getWeb3()
  const gameNameHex = web3.utils.utf8ToHex(formData.gameName)
  const status = (await getGameStatus(gameNameHex)).toNumber()
  console.log('status', status)
  if (status !== GameStatus.notStarted) {
    throw new SubmissionError({
      gameName: 'This game name was already used. Please choose another one',
      _error: 'Please fix the error'
    })
  }

  const rps = await getRpsContract()
  const secret = await getOrGenerateRandomSecret(formData.gameName)
  const hash = await shapeHash(formData.shape, secret)
  const tx = await rps.startGame(gameNameHex, hash, {
    from: formData.fromAccount,
    value: web3.utils.toWei(formData.bet, 'ether')
  })
  if (parseInt(tx.receipt.status, 16) !== 1) {
    console.log('tx', tx)
    throw new SubmissionError({ _error: 'Transaction error. Check the logs' })
  }
}

export const joinGame = async () => {}

async function shapeHash(shape, secret) {
  const web3 = await getWeb3()
  return web3.utils.soliditySha3({ t: 'uint8', v: shapes[shape] }, { t: 'bytes32', v: secret })
}

async function getOrGenerateRandomSecret(gameName) {
  const web3 = await getWeb3()
  const storageKey = `game-secret-${gameName}`
  if (localStorage.getItem(storageKey)) {
    return localStorage.getItem(storageKey)
  } else {
    const secret = web3.utils.randomHex(32)
    localStorage.setItem(storageKey, secret)
    return secret
  }
}
