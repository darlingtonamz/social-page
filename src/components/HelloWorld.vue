<template>
  <v-container>
    <v-row>
      <span
        v-for="(breadcrumb, pos) in breadcrumbs"
        :key="pos"
      >
        <span class="" v-if="pos > 0">></span>
        <span
          class="breadcrumb"
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
          v-for="(card, pos) in activeCard.cards"
          :key="pos"
          :title="card.title"
          :icon="card.icon"
          :subTitle="card.subTitle"
          :colors="card.colors"
          :isFolder="!!card.cards"
          @click="cardClicked(card)"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  import CardListItem from "./CardListItem";
  export default {
    name: 'HelloWorld',
    components: {
      CardListItem,
    },
    data: () => ({
      breadcrumbs: [],
      activeCard: {
        title: 'Home',
        cards: []
      },
      cards: [
        {
          url: 'https://www.youtube.com/channel/UCa475eqLbfWj2wRbdhQU6fA',
          title: 'Youtube',
          icon: 'https://avataaars.io/?avatarStyle=Transparent&topType=ShortHairShortCurly&accessoriesType=Prescription02&hairColor=Black&facialHairType=Blank&clotheType=Hoodie&clotheColor=White&eyeType=Default&eyebrowType=DefaultNatural&mouthType=Default&skinColor=Light',
          subTitle: 'This is my youtube channel',
          colors: {
            cardColor: '#ef9a9a',
            cardTheme: 'dark'
          }
        },
        {
          url: 'https://www.facebook.com/africoder',
          title: 'Facebook difudifudi',
          icon: 'https://avataaars.io/?avatarStyle=Transparent&topType=ShortHairShortCurly&accessoriesType=Prescription02&hairColor=Black&facialHairType=Blank&clotheType=Hoodie&clotheColor=White&eyeType=Default&eyebrowType=DefaultNatural&mouthType=Default&skinColor=Light',
          subTitle: 'This is my youtube channel',
          colors: {
            cardColor: '#26c6da',
            cardTheme: 'dark'
          }
        },
        {
          title: 'Manz 42',
          subTitle: 'This is my youtube channel',
          colors: {
            cardColor: '#fff',
          },
          cards: [
            {
              title: 'Manz 42 Youtube',
              icon: 'https://avataaars.io/?avatarStyle=Transparent&topType=ShortHairShortCurly&accessoriesType=Prescription02&hairColor=Black&facialHairType=Blank&clotheType=Hoodie&clotheColor=White&eyeType=Default&eyebrowType=DefaultNatural&mouthType=Default&skinColor=Light',
              subTitle: 'This is my youtube channel',
              colors: {
                cardColor: '#26c6da',
              },
            }
          ]
        },
      ],
    }),
    mounted() {
      this.activeCard.cards = this.cards;
      this.breadcrumbs.push({
        title: 'Home',
        cards: this.cards,
      });
    },
    methods: {
      cardClicked(card) {
        if (card.cards) {
          this.breadcrumbs.push(card);
          this.activeCard = card;
        } else if (card.url) {
          window.open(card.url, "_blank");
        }
      },
      setBreadcrumb(card, pos) {
        this.activeCard = card;
        this.breadcrumbs = this.breadcrumbs.slice(0, pos + 1)
      }
    }
  }
</script>

<style lang="scss">
.breadcrumb {
  padding: 5px;
  margin: 5px;
  &:hover {
    background: #ccc;
    border-radius: 3px;;
  }
}
</style>
