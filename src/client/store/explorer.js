import axios from 'axios'

const { web3 } = window
const API = process.env.VUE_APP_ETH_DATA_URL

const ETH_API_DATA = {
  API_SETTINGS: {
    PRICE: {
      MODULE: 'module=stats',
      ACTION: 'action=ethprice'
    },
    BLOCK_NUMBER: {
      MODULE: 'module=proxy',
      ACTION: 'action=eth_blockNumber'
    }
  }
}

export default ({
  namespaced: true,
  state: {
    ethPrice: 0,
    blockNo: 0,
    priceUpdateTime: process.env.VUE_APP_PRICE_UPDATE_TIME,
    blockNoUpdateTime: process.env.VUE_APP_BLOCK_NUMBER_UPDATE_TIME,
    searchFilterOptions: ['Transaction', 'Contract', 'Address'],
    txnData: {}
  },
  mutations: {
    updateEthPrice (state, data) {
      state.ethPrice = data
    },
    updateBlockNo (state, data) {
      state.blockNo = data
    },
    updateTxnData (state, data) {
      state.txnData = data
    }
  },
  actions: {
    async setEthPrice ({ commit }) {
      let settings = ETH_API_DATA.API_SETTINGS.PRICE
      let price = await axios.get(`${API}?apikey=${process.env.VUE_APP_ETH_KEY}&${settings.MODULE}&${settings.ACTION}`)
      price = {
        BTC: price.data.result.ethbtc,
        USD: price.data.result.ethusd
      }
      commit('updateEthPrice', price)
    },

    async getBalance ({ _ }, address) {
      return await web3.eth.getBalance(address) / 1e18
    },

    ethToUSD ({ state }, eth) {
      return eth * state.ethPrice.USD
    },

    async setBlockNo ({ commit }) {
      let settings = ETH_API_DATA.API_SETTINGS.BLOCK_NUMBER
      let blockNumber = await axios.get(`${API}?apikey=${process.env.VUE_APP_ETH_KEY}&${settings.MODULE}&${settings.ACTION}`)
      blockNumber = parseInt(blockNumber.data.result, 16)
      commit('updateBlockNo', { 'blockNo': blockNumber })
    },

    async fetchContractData ({ dispatch }, query) {
      const balance = await dispatch('getBalance', query)
      const code = await web3.eth.getCode(query)
      const balanceInUSD = await dispatch('ethToUSD', balance)
      const data = {
        'balance': `${balance} Ether`,
        'etherValue': `$${balanceInUSD}`,
        'code': code
      }
      return data
    },

    async fetchAddressData ({ dispatch }, query) {
      const balance = await dispatch('getBalance', query)
      const balanceInUSD = await dispatch('ethToUSD', balance)
      const data = {
        'balance': `${balance} Ether`,
        'etherValue': `$${balanceInUSD}`
      }
      return data
    },

    async fetchTransactionData ({ _ }, query) {
      const data = await web3.eth.getTransaction(query)
      return data
    }
  }
})
