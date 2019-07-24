<template>
  <div>
    <v-expansion-panel id="panel">
      <v-expansion-panel-content
        id="content"
        v-for="(heading) in heads"
      >
        <template v-slot:header>
          <div>
            {{ heading.heading_name }}
          </div>
        </template>
        <v-card light>
          <v-card-text>
            <div class="description">
              {{heading.description}}
            </div>
            <ul>
              <li v-for="(link, key) in heading.links">
                <a v-bind:href="link.link_address"> {{ link.link_title }} </a> {{ link.link_description }}
              </li>
            </ul>
            <ul v-for="(title) in titles" v-if = "heading.id === title.heading.id">
              <li>
                <div class="titles">
                  {{ title.title_name }}
                </div>
                <ul>
                  <li v-for="(link) in title.links">
                    <a v-bind:href="link.link_address"> {{ link.link_title }} </a> {{ link.link_description }}
                  </li>
                </ul>
              </li>
            </ul>
          </v-card-text>
        </v-card>
      </v-expansion-panel-content>
    </v-expansion-panel>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  name: 'learn',
  mounted () {
    this.LOAD_HEADINGS()
    this.LOAD_TITLES()
  },
  computed: {
    ...mapState('learn', [
      'heads',
      'titles'
    ])
  },
  methods: {
    ...mapActions('learn', [
      'LOAD_HEADINGS',
      'LOAD_TITLES'
    ])
  }
}
</script>

<style>

#panel{
  margin: 10px;
}

#content{
  background: #616161;
  color: white;
  font-size: 18px;
}

.titles{
  margin: 10px;
}

.description{
  padding-bottom: 20px;
}

</style>
