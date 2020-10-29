<template>
  <div class="home">
    <!-- <img alt="Vue logo" src="../assets/logo.png"> -->
    <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
    <SiteLinkViewer/>
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'
import SiteLinkViewer from '@/components/SiteLinkViewer.vue'

export default {
  name: 'Home',
  components: {
    // HelloWorld,
    SiteLinkViewer
  }
}
</script>
