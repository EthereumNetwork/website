<template>
  <v-container>
    <v-layout row wrap>
      <v-flex xs12 lg12 mb-3>
        <v-expansion-panel popout>
          <v-expansion-panel-content
            v-for="(item,i) in 5"
            :key="i"
          >
            <template v-slot:header>
              <div>Item</div>
            </template>
            <v-card>
              <v-card-text>Ooooooh, woooooooooooooooowww its working!!!</v-card-text>
            </v-card>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-flex>
    </v-layout>
  </v-container>
</template>