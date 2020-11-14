<template>
  <v-card
    :color="(siteLink.colors || {}).cardColor"
    :dark="(siteLink.colors || {}).cardTheme === 'dark'"
    style="margin-bottom: 5px"
  >
    <v-list-item class="grow" @click="$emit('click')">
      <v-list-item-avatar :color="(siteLink.colors || {}).cardAvatarColor || 'grey darken-3'">
        <v-icon v-if="isFolder" color="white">
          fa-folder
        </v-icon>
        <v-img
          v-else-if="siteLink.iconUrl"
          class="elevation-6"
          alt=""
          :src="siteLink.iconUrl"
        ></v-img>
        <v-icon
          v-else
          color="white"
        >
          {{siteLink.icon || 'fa-link'}}
        </v-icon>
      </v-list-item-avatar>

      <v-list-item-content>
        <v-list-item-title>{{siteLink.title}}</v-list-item-title>
        <v-list-item-subtitle>{{siteLink.subTitle}}</v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>
  </v-card>
</template>

<script>
  export default {
    name: 'CardListItem',
    props: {
      siteLink: {
        type: Object,
        default: () => ({}),
      },
    },
    data: () => ({}),
    computed: {
      isFolder () {
        return !!this.siteLink.children;
      }
    }
  }
</script>
