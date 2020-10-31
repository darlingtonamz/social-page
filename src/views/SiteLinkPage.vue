<template>
  <div class="">
    <router-view/>
    <SiteLinkViewer
      :routeIds="routeIds"
    />
  </div>
</template>

<script>
// @ is an alias to /src
import SiteLinkViewer from '@/components/SiteLinkViewer.vue'

export default {
  name: 'SiteLinkPage',
  components: {
    SiteLinkViewer
  },
  computed: {
    routeIds () {
      // ['', 'id1', 'id2', ...]
      return this.$route.path.split('/');
    }
  }
}
</script>