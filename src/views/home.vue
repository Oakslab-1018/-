<template>
  <div class="body">
    <div class="h1">TodoList</div>
    <List/>
  </div>
</template>

<script setup>
</script>

<style scoped>
.h1 {
  font-size: xx-large;
  font-weight: 800;
  color: rgb(32, 87, 121);
  margin-top: 40px;
}
.body {
  width: 100%;
  height: calc(100vh);
  background-size: cover;
  background-position: center;
  text-align: center;
  display: flex;
  flex-direction: column;
  background-image:url(../assets/login-back.webp);
}
</style>