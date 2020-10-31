<template>
  <div id="app">
    <v-app>
      <v-app-bar
        app
        color="primary"
        dark
      >
        <div class="d-flex align-center">
          <img
            alt="Vue logo"
            src="./assets/logo.jpg"
            class="site-icon">
          <!-- <v-img
            alt="Vuetify Logo"
            class="shrink mr-2"
            contain
            :src="siteIconUrl || 'https://cdn.vuetifyjs.com/images/logos/vuetify-logo-dark.png'"
            transition="scale-transition"
            width="40"
          /> -->
          <span class="site-title">
            {{appConfig.siteName}}
          </span>
        </div>

        <v-spacer></v-spacer>
      </v-app-bar>

      <v-main
        :style="{ background: (appConfig.background || '#e3f2fd') }"
      >
    <router-view/>
        <!-- <HelloWorld/> -->
      </v-main>
    </v-app>
  </div>
</template>
<script>
import appConfig from './configs/appConfig';
export default {
  name: 'App',
  data: () => ({}),
  computed: {
    appConfig: () => appConfig,
    // siteIconUrl: () => require(appConfig.siteIconUrl)
    siteIconUrl: () => "./assets/logo.png"
  }
};
</script>
<style lang="scss">
#app {
  font-family: Roboto;
}

.site-title {
  font-size: 2em;
  font-weight: 500;
}

.site-icon {
  border-radius: 50%;
  margin-right: 10px;
  width: 40px;
  box-shadow: 0px 4px 13px -8px #000;
}
</style>
