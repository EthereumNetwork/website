<template>
  <v-container>
    <form @submit="search" autocomplete="off">
      <input type="text" placeholder="Search projects..." name="search">
    </form>
    <v-layout row wrap>
      <v-progress-circular v-if="this.dapps.length === 0 && !this.storeErrorPage()" indeterminate color="primary" class="progress"></v-progress-circular>
      <ProjectCard v-else v-bind:key="dapp.name" v-for="dapp of this.fillDapps" v-bind:cardData="dapp"/>
    </v-layout>
    <NoProjectFound v-if="this.storeErrorPage()"/>
  </v-container>
</template>

<script>
import ProjectCard from '../components/ProjectCard'
import NoProjectFound from '../components/NoProjectFound'
import { mapState, mapActions, mapMutations } from 'vuex'

export default {
  name: 'projects',
  components: {
    ProjectCard,
    NoProjectFound
  },
  data () {
    return {
      ...mapState({
        storePage: 'page',
        storeDapps: 'dapps',
        storeErrorPage: 'errorPage'
      }),
      dapps: [],
      doSeacrh: false,
      searchText: '',
      scrollToBottom: false
    }
  },
  async mounted () {
    await this.fillDapp({ page: `&page=${this.storePage()}`})
    this.dapps = this.storeDapps()
    this.scroll()
    const input = document.querySelector('input')
    input.addEventListener('input', this.search)
  },
  methods: {
    ...mapActions([
      'fillDapp'
    ]),
    ...mapMutations([
      'incPage',
      'emptyDapps',
      'setPageValue',
      'setErrorPageStatus'
    ]),
    searchSetup () {
      this.emptyDapps()
      this.dapps = []
      this.setPageValue(1)
    },
    async search (data) {
      let value = data.srcElement.value
      this.searchText = value
      this.searchSetup()
      if (value === '') {
        this.setErrorPageStatus(false)
        await this.fillDapp({ page:`&page=${this.storePage()}` })
        this.dapps = this.storeDapps()
      }
      if (value !== '') {
        await this.fillDapp({ page: `&page=${this.storePage()}`, text: `&text=${this.searchText}` })
        this.dapps = this.storeDapps()
        if (this.dapps.length === 0) {
          this.setErrorPageStatus(true)
        } else {
          this.setErrorPageStatus(false)
        }
      }
    },
    scroll() {
      window.onscroll = () => {
        let bottomOfWindow =
          Math.floor(Math.max(
            window.pageYOffset,
            document.documentElement.scrollTop,
            document.body.scrollTop
          ) +
            window.innerHeight) ===
          document.documentElement.offsetHeight || Math.ceil(Math.max(
            window.pageYOffset,
            document.documentElement.scrollTop,
            document.body.scrollTop
          ) +
            window.innerHeight) ===
          document.documentElement.offsetHeight
        if (bottomOfWindow) {
          this.scrollToBottom = true
        }
      }
    }
  },
  watch: {
    scrollToBottom: function() {
      if (this.scrollToBottom) {
        this.scrollToBottom = false
        this.incPage()
        let queryText = ''
        if (this.searchText !== '')
          queryText = `&text=${this.searchText}`
        this.fillDapp({ page:`&page=${this.storePage()}`, text: queryText })
        this.dapps = this.storeDapps()
      }
    }
  },
  computed: {
    fillDapps() {
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

.progress {
  display: inline;
  margin-left: 48%;
  margin-top: 30vh;
}
</style>
