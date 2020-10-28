<template>
  <v-card
    :color="colors.cardColor"
    :dark="colors.cardTheme === 'dark'"
  >
    <v-list-item class="grow" @click="$emit('click')">
      <v-list-item-avatar color="grey darken-3">
        <v-icon v-if="isFolder" color="white">
          text_snippet
        </v-icon>
        <v-img
          v-else
          class="elevation-6"
          alt=""
          :src="icon"
        ></v-img>
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
        required: true,
      },
      subTitle: {
        type: String,
        required: true,
      },
      colors: {
        type: Object,
        required: true,
      },
      isFolder: {
        type: Boolean,
        default: false,
      }
    },
    data: () => ({}),
    methods: {
      // doSomething: () => {
      //   console.log('dfjhjhkdfjhkdf');
      //   this.$emit('card-clicked')
      // }
    }
  }
</script>
