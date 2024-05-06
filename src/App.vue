<template>
  <RouterView />
</template>
<script lang="ts" setup>
</script>
<style lang="scss">
body,
html {
  height: 100%;
}
* {
  margin: 0;
  /* padding: 0; */
}

#app {
  height: 100%;
}

#container {
  height: 100%;
  display: flex;
  flex-direction: column;
  #header {
    display: flex;
    width: 100%;
    height: 60px;
    justify-content: space-between;
    border-bottom: 1px solid #eee;
    padding: 0 20px;
    box-sizing: border-box;
    .logo {
      width: 200px;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .nav {
      min-width: 250px;
    }
  }
  #content {
  // flex: 1;
    height: calc(100% - 61px);
  }
}
</style>
