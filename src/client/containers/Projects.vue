<template>
  <div>
    <form @submit="search">
      <input type="text" placeholder="Search projects" name="search" v-model="searchName">
      <button type="submit"><i class="fa fa-search"></i></button>
    </form>
    <div class="card">
      <ProjectCard v-bind:key="dapp.rank" v-for="dapp of dapps.items" v-bind:cardData="dapp"/>
    </div>
  </div>
</template>

<script>
import ProjectCard from "../components/ProjectCard";

export default {
  name: "projects",
  components: {
    ProjectCard
  },
  data() {
    return {
      dapps: {},
      searchName: '',
      tempSearchName: '',
      scrollToBottom: false
    }
  },
  mounted() {
    this.dapps = this.$store.state.dapps
    this.tempSearchName = this.dapps
    this.scroll()
  },
  methods: {
    search () {
      console.log(this.searchName)
    },
    scroll () {
      window.onscroll = () => {
        let bottomOfWindow = Math.max(window.pageYOffset, document.documentElement.scrollTop, document.body.scrollTop) + window.innerHeight === document.documentElement.offsetHeight
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
        this.$store.commit('incPage')
        this.$store.dispatch('fillDapp', this.$store.state.page)
      }
    }
  }
  // updated: function () {
  //   if (this.searchName === '') {
  //     this.searchName = this.tempSearchName
  //   }
  //   else {
  //     let result = {}
  //     for (let dapp of this.dapps.items) {
  //       let str = dapp.name.toLowerCase()
  //       let re = new RegExp(this.searchName, 'g')
  //       if (str.match(re)) {
  //         for (let elem in dapp) {
  //           result[elem] = dapp[elem]
  //         } 
  //       }
  //     }
  //     this.searchName = result
  //   }
  // }
}
</script>

<style scoped>
.card {
  display: grid;
  grid-template-columns: auto auto auto auto;
  grid-gap: 40px;
  margin-top: 20px;
  margin-bottom: 20px;

}

form {
  padding: 50px;
}

input {
  margin-right: 100px;
  border-radius: 3px;
  padding: 10px;
  width: 100%;
  box-shadow: inset 1px 1px 3px gray;
  outline: none;
}
</style>
