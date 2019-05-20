<template>
  <!-- <div id="app">
    <v-app id="inspire">
      <v-container grid-list-md text-xs-center>
        <v-layout row wrap>
          <v-flex xs12 sm4>
            <v-card>
              <v-img class="white--text" height="auto" width="auto" :src="cardData.iconUrl"></v-img>
              <v-layout fill-height>
                <v-flex xs12 align-end flexbox>
                  <span class="headline">{{ cardData.name }}</span>
                </v-flex>
              </v-layout>
              <v-card-title>
                <div style="margin:auto">
                  <span>{{ cardData.teaser }}</span>
                </div>
              </v-card-title>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-app>
  </div> -->

  <div class="container">
    <div class="imgContainer">
      <img :src="cardData.iconUrl">
    </div>
    <div class="text">
      <h4>{{ cardData.name }}</h4>
      <p>{{ cardData.teaser }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "ProjectCard",
  props: {
    cardData: Object
  }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css?family=Roboto&display=swap');
:root {
  --card-height: 300px;
  --card-width: 200px;
}
.container {
  box-shadow: 0 1px 5px gray;
  height: 300px;
  width: 200px;
  padding: 10px;
  border-radius: 3px;
  background-color: rgb(243, 243, 243);
}

.imgContainer {
  height: 200px !important;
}

img {
  width: 100%;
  height: 100%;
}

.text {
  margin-top: 10px;
  height:100px;
  font-family: 'Roboto', sans-serif;
}

.text h4 {
  width: 100%;
  margin-bottom: 10px;
}

</style>
