<template>
  <v-container>
    <form @submit="search" autocomplete="off">
      <input type="text" placeholder="Search projects..." name="search">
    </form>
    <v-layout row wrap>
      <v-progress-circular v-if="this.dapps.length === 0 && !this.$store.state.errorPage" indeterminate color="primary"></v-progress-circular>
      <ProjectCard v-else v-bind:key="dapp.name" v-for="dapp of this.fillDapps" v-bind:cardData="dapp"/>
    </v-layout>
    <NoProjectFound v-if="this.$store.state.errorPage"/>
  </v-container>
</template>

<script>
import ProjectCard from '../components/ProjectCard'
import NoProjectFound from '../components/NoProjectFound'

export default {
  name: 'projects',
  components: {
    ProjectCard,
    NoProjectFound
  },
  data() {
    return {
      dapps: [],
      tempDapps: [],
      doSeacrh: false,
      scrollToBottom: false
    }
  },
  mounted() {
    this.dapps = this.$store.state.dapps
    this.tempDapps = this.dapps
    this.scroll()
    const input = document.querySelector('input')
    input.addEventListener('input', this.search)
  },
  methods: {
    async search(data) {
      let value = data.srcElement.value
      if (value === '') {
        this.doSeacrh = false
        this.dapps = this.tempDapps
        this.$store.state.errorPage = false
      }
      if (value !== '') {
        this.doSeacrh = true
        this.dapps = []
        this.dapps = await this.$store.getters.getDataByQuery(`?text=${value}`)
        this.dapps = this.dapps.data.items
      }
    },
    scroll() {
      window.onscroll = () => {
        let bottomOfWindow =
          Math.max(
            window.pageYOffset,
            document.documentElement.scrollTop,
            document.body.scrollTop
          ) +
            window.innerHeight ===
          document.documentElement.offsetHeight
        if (bottomOfWindow) {
          this.scrollToBottom = true
        }
      }
    }
  },
  watch: {
    scrollToBottom: function() {
      if (this.scrollToBottom && !this.doSeacrh) {
        this.scrollToBottom = false
        this.$store.commit('incPage')
        this.$store.dispatch('fillDapp', `?page=${this.$store.state.page}`)
        this.dapps = this.$store.state.dapps
        this.tempDapps = this.dapps
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
</style>
