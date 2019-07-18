<template>
  <v-app>
    <v-navigation-drawer v-model="drawer" app dark absolute>
      <v-list>
        <v-list-tile>
          <v-list-tile-content>
            <v-list-tile-title>
              <span>Menu</span>
            </v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-divider id='list' ></v-divider>
        <template v-for="(item, index) in items">
          <v-list-tile :href="item.href" :to="{name: item.href}" :key="index">
            <v-list-tile-action>
              <v-icon dark v-html="item.icon"></v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title v-html="item.title"></v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </template>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar app dark clipped-left>
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title class="headline">
        <span>Ethereum Network</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn
        v-if="!connectButtonHidden"
        @click='connectWEB3'
      >
        Connect To WEB3
      </v-btn>
      <v-btn
        icon
        href="https://github.com/EthereumNetwork/website"
        target="_blank"
      >
        <v-icon>open_in_new</v-icon>
      </v-btn>
    </v-toolbar>

    <v-content>
      <router-view/>
    </v-content>
  </v-app>
</template>

<script>
import setupWeb3 from './web3'
import Web3 from 'web3'

export default {
  name: 'App',
  data () {
    return {
      drawer: false,
      connectButtonHidden: false,
      items: [{
        href: 'home',
        router: true,
        title: 'Home',
        icon: 'home'
      }, {
        href: 'about',
        router: true,
        title: 'About',
        icon: 'domain'
      }, {
        href: 'projects',
        router: true,
        title: 'Projects',
        icon: 'folder'
      }, {
        href: 'explorer',
        router: true,
        title: 'Explorer',
        icon: 'explore'
      }, {
        href: 'learn',
        router: true,
        title: 'Learn',
        icon: 'book'
      }, {
        href: 'calendar',
        router: true,
        title: 'Calendar',
        icon: 'event'
      }]
    }
  },
  mounted () {
    web3.eth.getAccounts((err, accounts) => {
      if (accounts.length !== 0) { this.connectButtonHidden = true }
    })
    web3.currentProvider.publicConfigStore.on('update', (data) => {
      if (data.selectedAddress) { this.connectButtonHidden = true } else { this.connectButtonHidden = false }
    })
  },
  methods: {
    async connectWEB3 () {
      await setupWeb3()
    }
  }
}
</script>

<style lang="stylus">
  @import '../../node_modules/vuetify/src/stylus/main';
  @import 'css/main.css';

#list{
  padding: 10px;
  font-size: 200px;
}
</style>
