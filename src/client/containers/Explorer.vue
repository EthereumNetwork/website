<template>
  <v-container class="container">
    <form autocomplete="off">
      <v-select :items="this.searchFilterOptions" label="filter" background-color="rgb(243, 243, 243)" solo class="filterOptions" @input="setSearchOption"></v-select>
      <input type="text" placeholder="look up addresses, txIDs and smart contract properties..." name="search" v-model="searchQuery" @input="search">
    </form>
    <p>{{ this.errorMessage }}</p>
    <v-layout row wrap>
      <PriceAndBlockNoCard :key="data.title" v-for="data of this.priceAndBlockNoCardData" :data="data.data" :title="data.title" :grid="data.grid"/>
      <Progress :data="this.priceAndBlockNoCardData"/>
    </v-layout>
  </v-container>
</template>

<script>
import Progress from '../components/Progress'
import PriceAndBlockNoCard from '../components/explorer/PriceAndBlockNoCard'
import { mapState, mapActions } from 'vuex'

export default {
  name: 'explorer',
  components: {
    Progress,
    PriceAndBlockNoCard
  },
  data () {
    return {
      searchQuery: '',
      searchOption: '',
      errorMessage: '',
      priceAndBlockNoCardData: []
    }
  },
  async mounted () {
    await this.setEthPrice()
    await this.setBlockNo()
    this.setData()
    window.setInterval(this.priceUpdate, this.priceUpdateTime)
    window.setInterval(this.blockUpdate, this.blockNoUpdateTime)
  },
  methods: {
    ...mapActions('explorer/', [
      'setBlockNo',
      'setEthPrice',
      'setPageLoadTime',
      'fetchAddressData',
      'fetchContractData',
      'fetchTransactionData'
    ]),
    setData () {
      this.priceAndBlockNoCardData = [{
        data: this.ethPrice,
        title: 'Current Price'
      }, {
        data: this.blockNo,
        title: 'Current Block Number'
      }]
    },
    async priceUpdate () {
      await this.setEthPrice()
      this.priceAndBlockNoCardData[0].data = this.ethPrice
    },
    async blockUpdate () {
      await this.setBlockNo()
      this.priceAndBlockNoCardData[1].data = this.blockNo
    },
    async search (e) {
      if (this.searchOption === '') {
        return this.setErrorMessage('*please select a search filter')
      }
      let searchData
      let query = e.srcElement.value.trim()
      const filter = this.searchOption
      this.priceAndBlockNoCardData.length = 2
      if (!query) return this.setErrorMessage('')

      if (this.isValidAddress(query, filter)) {
        this.setErrorMessage('')
        if (filter === this.searchFilterOptions[1]) searchData = await this.fetchContractData(query)
        else if (filter === this.searchFilterOptions[0]) searchData = await this.fetchTransactionData(query)
        else searchData = await this.fetchAddressData(query)

        if (!searchData) return this.setErrorMessage(`No data found attached to this address using the ${filter} filter`)
        this.priceAndBlockNoCardData = [...this.priceAndBlockNoCardData, {
          data: searchData,
          title: `${filter} data`,
          grid: 'sm12'
        }]
      } else {
        this.setErrorMessage(`Address not valid for the ${filter} filter`)
      }
    },
    setErrorMessage (message) {
      this.errorMessage = message
    },
    isValidAddress (address, filter) {
      return ((address.length === 66 && filter === this.searchFilterOptions[0]) ||
            (address.length === 42 && (filter === this.searchFilterOptions[1] || filter === this.searchFilterOptions[2]))) &&
            (/[0-9a-fA-F]$/i.test(address.split('0x')[1]))
    },
    setSearchOption (data) {
      if (data !== undefined) {
        this.errorMessage = ''
      }
      this.searchOption = data
    }
  },
  computed: {
    ...mapState('explorer/', {
      blockNo: 'blockNo',
      ethPrice: 'ethPrice',
      priceUpdateTime: 'priceUpdateTime',
      blockNoUpdateTime: 'blockNoUpdateTime',
      searchFilterOptions: 'searchFilterOptions'
    })
  }
}
</script>

<style scoped>
p {
  color: red;
  padding-top: 0;
  text-align: center;
}
button {
  background-color: rgb(243, 243, 243);
}
form {
  padding: 18px;
  display: flex;
}
input{
  height: 100%;
  border-radius: 0 3px 3px 0 !important;
  padding: 16px;
  width: 100%;
  outline: none;
  background-color: rgb(243, 243, 243);
  box-shadow: 0 1px 2px gray;
}
</style>
