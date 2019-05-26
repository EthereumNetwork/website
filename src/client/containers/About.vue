<template>
  <v-layout>
    <v-flex xs12 sm6 offset-sm3>
      <v-card v-for="(item,i) in 20"
            :key="i">
        <v-card-title primary-title>
          <div>
            <h3 class="headline mb-0"><a :id="i" :href="`#${i}`">Item {{i}}</a></h3>
            <div> {{ card_text }} </div>
          </div>
        </v-card-title>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  data () {
    return {
      card_text: 'Lorem ipsum dolor sit amet, brute iriure accusata ne mea. Eos suavitate referrentur ad, te duo agam libris qualisque, utroque quaestio accommodare no qui. Et percipit laboramus usu, no invidunt verterem nominati mel. Dolorem ancillae an mei, ut putant invenire splendide mel, ea nec propriae adipisci. Ignota salutandi accusamus in sed, et per malis fuisset, qui id ludus appareat.'
    }
  }
}
</script>

<style>
a {
  text-decoration: none
}
</style>
