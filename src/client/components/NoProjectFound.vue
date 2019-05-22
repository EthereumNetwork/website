<template>
  <div class="text-xs-center">
    <div class="emoji"></div>
    <div class="container">
      <h2 class="display-3 font-weight-thin">Sorry, no project found</h2>
    </div>
  </div>
</template>

<style scoped>
.container {
  width: 100%;
  height: 100vh;
  text-align: center;
}
.display-3 {
  margin-top: 15%;
  height: 100%;
}
.emoji {
  width: 20px;
  height: 20px;
  position: absolute;
  margin-top: 5%;
  margin-left:40%;
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
