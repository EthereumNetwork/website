<template>
  <div class="text-xs-center">
    <div class="emoji-container">
      <div class="emoji"></div>
    </div>
    <div class="title-container">
      <h2 class="display-3 font-weight-thin">{{ message }}</h2>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NoProjectFound',
  props: {
    message: String
  }
}
</script>

<style scoped>
.text-xs-center {
  padding: 100px;
  display: inline-block;
  width: 100%;
  height: 100%;
}
.title-container {
  margin-top: 108px;
}

.emoji-container {
  transform: translate(50%);
  margin-left: -80px;
  height: 100%;
}

.emoji {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: black;
  box-shadow: 60px 0 0 0 black;
}

.emoji:after {
  content: '';
  width: 150px;
  height: 150px;
  position: absolute;
  border-radius: 50%;
  margin-left: -45px;
  border: 3px solid black;
  margin-top: 50px;
  border-color: black transparent transparent transparent;
}

.emoji:before {
  content: '';
  position: absolute;
  width: 150px;
  height: 150px;
  margin-top: -40px;
  margin-left: -45px;
  border-radius: 50%;
  border: 2px solid black;
}
</style>
