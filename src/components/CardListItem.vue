<template>
  <v-card
    :color="colors.cardColor"
    :dark="colors.cardTheme === 'dark'"
  >
    <v-list-item class="grow" @click="$emit('click')">
      <v-list-item-avatar color="grey darken-3">
        <v-icon v-if="isFolder" color="white">
          fa-folder
        </v-icon>
        <v-img
          v-else-if="iconUrl"
          class="elevation-6"
          alt=""
          :src="iconUrl"
        ></v-img>
        <v-icon
          v-else
          color="white"
        >
          {{icon || 'fa-link'}}
        </v-icon>
      </v-list-item-avatar>

      <v-list-item-content>
        <v-list-item-title>{{title}}</v-list-item-title>
        <v-list-item-subtitle>{{subTitle}}</v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>
  </v-card>
</template>

<script>
  export default {
    name: 'CardListItem',
    props: {
      title: {
        type: String,
        required: true,
      },
      icon: {
        type: String,
        default: null,
      },
      iconUrl: {
        type: String,
        default: null,
      },
      subTitle: {
        type: String,
        required: true,
      },
      colors: {
        type: Object,
        default: () => ({}),
      },
      isFolder: {
        type: Boolean,
        default: false,
      }
    },
    data: () => ({}),
  }
</script>
