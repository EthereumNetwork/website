<template>
  <v-flex xs12 sm3>
    <v-card class="card">
      <v-img :src="cardData.iconUrl" aspect-ratio="1" class="grey lighten-2"></v-img>
      <v-card-title primary-title style="margin:0 !important; padding: 10px 0 0 0;">
        <div class="titles">
          <div style="font-size: inherit !important;" class="headline">{{cardData.name}}</div>
          <span style="font-size: inherit !important;" class="grey--text">{{cardData.teaser}}</span>
        </div>
      </v-card-title>
    </v-card>
  </v-flex>
</template>

<script>
export default {
  name: "ProjectCard",
  props: {
    cardData: Object
  }
};
</script>

<style scoped>
.sm3 {
  padding: 20px;
}

.card {
  padding: 10px;
  height: 100%;
  background-color: rgb(243, 243, 243);
  cursor: pointer;

}

.card:hover {
  box-shadow: 0 10px 5px -5px gray;
}

.card:active {
  box-shadow: none;
}

.grey {
  border-radius: 3px;
  border: 1px solid rgb(143, 143, 143);
  object-fit: contain;
}

.titles {
  white-space: nowrap; 
  width: 100%; 
  overflow: hidden;
  text-overflow: ellipsis; 
}

.titles:hover {
  overflow: visible;
  word-wrap: break-word;
  white-space: pre-wrap;
}
</style>
