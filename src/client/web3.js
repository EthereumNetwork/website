import Web3 from 'web3'

let web3Provider
const RPC_URL = process.env.VUE_APP_RPC_URL
const RPC_PORT = process.env.VUE_APP_RPC_PORT

const { web3, ethereum } = window
export default async function setupWeb3 () {
  if (typeof web3 !== 'undefined') {
    web3Provider = web3.currentProvider
    await ethereum.enable()
  } else {
    web3Provider = new Web3.providers.HttpProvider(`${RPC_URL}:${RPC_PORT}`)
  }
  window.web3 = new Web3(web3Provider)
}
