<template>
  <v-card
    :color="(socialLink.colors || {}).cardColor"
    :dark="(socialLink.colors || {}).cardTheme === 'dark'"
    style="margin-bottom: 5px"
  >
    <v-list-item class="grow" @click="$emit('click')">
      <v-list-item-avatar :color="(socialLink.colors || {}).cardAvatarColor || 'grey darken-3'">
        <v-icon v-if="isFolder" color="white">
          fa-folder
        </v-icon>
        <v-img
          v-else-if="socialLink.iconUrl"
          class="elevation-6"
          alt=""
          :src="socialLink.iconUrl"
        ></v-img>
        <v-icon
          v-else
          color="white"
        >
          {{socialLink.icon || 'fa-link'}}
        </v-icon>
      </v-list-item-avatar>

      <v-list-item-content>
        <v-list-item-title>{{socialLink.title}}</v-list-item-title>
        <v-list-item-subtitle>{{socialLink.subTitle}}</v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>
  </v-card>
</template>

<script>
  export default {
    name: 'CardListItem',
    props: {
      socialLink: {
        type: Object,
        default: () => ({}),
      },
    },
    data: () => ({}),
    computed: {
      isFolder () {
        return !!this.socialLink.children;
      }
    }
  }
</script>
