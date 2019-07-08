<template>
  <v-container>
    <form @submit="search" autocomplete="off">
      <input type="text" placeholder="Search projects..." name="search" v-on:input="this.search">
    </form>
    <v-layout row wrap>
      <Progress :data="this.dapps" :showError="this.showError"/>
      <ProjectCard :key="dapp.name" v-for="dapp of this.returnDapps" :cardData="dapp"/>
    </v-layout>
    <NoProjectFound v-if="this.showError" :message="this.errorMessage"/>
  </v-container>
</template>

<script>
import Progress from '../components/Progress'
import ProjectCard from '../components/ProjectCard'
import NoProjectFound from '../components/NoProjectFound'
import { mapState, mapActions, mapMutations } from 'vuex'

export default {
  name: 'projects',
  components: {
    Progress,
    ProjectCard,
    NoProjectFound
  },
  data () {
    return {
      dapps: [],
      searchText: '',
      scrollToBottom: false,
      errorMessage: 'Sorry, no project found!'
    }
  },
  async mounted () {
    await this.fetchDapps({ page: `&page=${this.pageNo}` })
    this.dapps = this.storeDapps
    this.scroll()

    await this.fetchDapps({ page: `&page=${this.pageNo}` })
    this.dapps = this.storeDapps
  },
  methods: {
    ...mapActions('projects/', [
      'fetchDapps'
    ]),
    ...mapMutations('projects/', [
      'emptyDapps',
      'setPageNo',
      'incrementPageNo',
      'toggleError'
    ]),
    searchSetup () {
      this.emptyDapps()
      this.dapps = []
      this.setPageNo(1)
    },
    async search (data) {
      let value = data.srcElement.value
      this.searchText = value
      this.searchSetup()

      let searchQuery = {
        page: `&page=${this.pageNo}`
      }
      value === '' ? this.toggleError(false) : searchQuery['text'] = `&text=${this.searchText}`
      await this.fetchDapps(searchQuery)
      this.dapps = this.storeDapps
      this.dapps.length === 0 ? this.toggleError(true) : this.toggleError(false)
    },
    scroll () {
      window.onscroll = () => {
        let pageYOffset = window.pageYOffset
        let windowHeight = window.innerHeight
        let bodyScrollTop = document.body.scrollTop
        let offsetHeight = document.documentElement.offsetHeight
        let scrollTop = document.documentElement.scrollTop

        let scrollHeight = Math.max(pageYOffset, scrollTop, bodyScrollTop) + windowHeight

        let bottomOfWindow =
          Math.floor(scrollHeight) === offsetHeight ||
          Math.ceil(scrollHeight) === offsetHeight

        if (bottomOfWindow) {
          this.scrollToBottom = true
        }
      }
    }
  },
  watch: {
    scrollToBottom: function () {
      if (this.scrollToBottom) {
        this.scrollToBottom = false
        this.incrementPageNo()
        let queryText = ''
        if (this.searchText !== '') { queryText = `&text=${this.searchText}` }
        this.fetchDapps({ page: `&page=${this.pageNo}`, text: queryText })
        this.dapps = this.storeDapps
      }
    }
  },
  computed: {
    ...mapState('projects/', {
      pageNo: 'page',
      storeDapps: 'dapps',
      showError: 'showError'
    }),
    returnDapps () {
      return this.dapps
    }
  }
}
</script>

<style scoped>
form {
  padding: 18px;
}

input {
  border-radius: 3px;
  padding: 10px;
  width: 100%;
  outline: none;
  background-color: rgb(243, 243, 243);
  box-shadow: 0 1px 2px gray;
}
</style>
