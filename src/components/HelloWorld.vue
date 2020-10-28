<template>
  <v-container>
    <v-row>
      <span
        v-for="(breadcrumb, pos) in breadcrumbLinks"
        :key="pos"
      >
        <span class="" v-if="pos > 0">></span>
        <span
          class="breadcrumb"
          :class="{'active': pos === (breadcrumbLinks.length - 1)}"
          :disabled="true"
          @click="setBreadcrumb(breadcrumb, pos)"
        >
          {{breadcrumb.title}}
        </span>
      </span>
        
    </v-row>
    <v-row>
      <v-col>
        <CardListItem
          v-for="(card, pos) in activeCard.socialLinks"
          :key="pos"
          :title="card.title"
          :icon="card.icon"
          :iconUrl="card.iconUrl"
          :subTitle="card.subTitle"
          :colors="card.colors"
          :isFolder="!!card.socialLinks"
          @click="cardClicked(card)"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  import CardListItem from "./CardListItem";
  import socialLinks from "../configs/socialLinks";

  export default {
    name: 'HelloWorld',
    components: {
      CardListItem,
    },
    data: () => ({
      breadcrumbLinks: [],
      activeCard: {
        title: 'Home',
        socialLinks: []
      },
    }),
    computed: {
      socialLinks() {
        return socialLinks
      }
    },
    mounted() {
      this.activeCard.socialLinks = this.socialLinks;
      this.breadcrumbLinks.push({
        title: 'Home',
        socialLinks: this.socialLinks,
      });
    },
    methods: {
      cardClicked(card) {
        if (card.socialLinks) {
          this.breadcrumbLinks.push(card);
          this.activeCard = card;
        } else if (card.url) {
          window.open(card.url, "_blank");
        }
      },
      setBreadcrumb(card, pos) {
        if (pos !== (this.breadcrumbLinks.length - 1)) {
          this.activeCard = card;
          this.breadcrumbLinks = this.breadcrumbLinks.slice(0, pos + 1)
        }
      }
    }
  }
</script>

<style lang="scss">
.breadcrumb {
  padding: 5px;
  margin: 5px;
  cursor: pointer;
  text-overflow: ellipsis;
  border-radius: 3px;
  &:hover {
    background: #ccc;
  };
  
  &.active {
    color: #1976d2;
    &:hover {
      background: none;
      cursor:initial;
    };
  }
}
</style>
