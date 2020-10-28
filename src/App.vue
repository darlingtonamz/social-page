<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
      dark
    >
      <div class="d-flex align-center">
        <v-img
          alt="Vuetify Logo"
          class="shrink mr-2"
          contain
          src="https://cdn.vuetifyjs.com/images/logos/vuetify-logo-dark.png"
          transition="scale-transition"
          width="40"
        />
        <span class="site-title">
          {{appConfig.siteName}}
        </span>
      </div>

      <v-spacer></v-spacer>
    </v-app-bar>

    <v-main
      :style="{ background: (appConfig.background || '#e3f2fd') }"
    >
      <HelloWorld/>
    </v-main>
  </v-app>
</template>

<script>
import HelloWorld from './components/HelloWorld';
import appConfig from './configs/appConfig';

export default {
  name: 'App',

  components: {
    HelloWorld,
  },

  data: () => ({
    //
  }),
  computed: {
    appConfig: () => appConfig,
  }
};
</script>
<style lang="scss">
.site-title {
  font-size: 2em;
  font-weight: 500;
}
</style>
