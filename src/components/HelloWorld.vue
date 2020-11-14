<template>
  <v-container>
    <v-row>
      <v-col>
        <span
          v-for="(breadcrumb, pos) in breadcrumbLinks"
          :key="pos"
        >
          <span style="margin: 3px;" v-if="pos > 0">></span>
          <span
            class="breadcrumb"
            :class="{'active': pos === (breadcrumbLinks.length - 1)}"
            :disabled="true"
            @click="setBreadcrumb(breadcrumb, pos)"
          >
            {{breadcrumb.title}}
          </span>
        </span>
      </v-col>
    </v-row>
    <v-toolbar
      flat
    >
      <v-btn
        icon
        @click="goBack()"
        v-if="breadcrumbLinks.length > 1"
      >
        <v-icon>mdi-arrow-left</v-icon>
      </v-btn>
      <v-btn
        v-else
        icon
        disabled
      >
        <v-icon>mdi-home</v-icon>
      </v-btn>
      <v-toolbar-title>{{activeSiteLink.title}}</v-toolbar-title>
      <v-spacer></v-spacer>
    </v-toolbar>
    <v-row>
      <v-col>
        <CardListItem
          v-for="(siteLink, pos) in activeSiteLink.children"
          :key="pos"
          :title="siteLink.title"
          :icon="siteLink.icon"
          :iconUrl="siteLink.iconUrl"
          :subTitle="siteLink.subTitle"
          :colors="siteLink.colors"
          :isFolder="!!siteLink.children"
          @click="siteLinkClicked(siteLink)"
        />
      </v-col>
    </v-row>
    <v-snackbar
      v-model="snackbar"
    >
      {{ snackbarText }}

      <template v-slot:action="{ attrs }">
        <v-btn
          color="pink"
          text
          v-bind="attrs"
          @click="snackbar = false"
        >
          Close
        </v-btn>
      </template>
    </v-snackbar>
  </v-container>
</template>

<script>
  import CardListItem from "./CardListItem";
  import siteLinks from "../configs/siteLinks";

  export default {
    name: 'HelloWorld',
    components: {
      CardListItem,
    },
    data: () => ({
      breadcrumbLinks: [],
      activeSiteLink: {
        title: 'Home',
        children: []
      },
      snackbar: false,
      snackbarText: '',
    }),
    computed: {
      siteLinks() {
        return siteLinks
      }
    },
    mounted() {
      this.activeSiteLink.children = this.siteLinks;
      this.breadcrumbLinks.push({
        title: 'Home',
        children: this.siteLinks,
      });
    },
    methods: {
      siteLinkClicked(siteLink) {
        if (siteLink.children) {
          this.breadcrumbLinks.push(siteLink);
          this.activeSiteLink = siteLink;
        } else if (siteLink.url) {
          window.open(siteLink.url, "_blank");
        } else {
          this.showSnackbarMessage('Link is missing');
          console.warn('SiteLink Config Error - Please contact site owner to configure src/config/siteLinks.js properly')
        }
      },
      setBreadcrumb(siteLink, pos) {
        if (pos !== (this.breadcrumbLinks.length - 1)) {
          this.activeSiteLink = siteLink;
          this.breadcrumbLinks = this.breadcrumbLinks.slice(0, pos + 1)
        }
      },
      goBack() {
        if (this.breadcrumbLinks.length > 1) {
          this.breadcrumbLinks = this.breadcrumbLinks.slice(0, this.breadcrumbLinks.length - 1);
          this.activeSiteLink = this.breadcrumbLinks[this.breadcrumbLinks.length - 1];
        }
      },
      showSnackbarMessage(message) {
        this.snackbar = true;
        this.snackbarText = message;
      }
    }
  }
</script>

<style lang="scss">
.breadcrumb {
  padding: 3px 5px;
  margin: 7px 0;
  cursor: pointer;
  text-overflow: ellipsis;
  color: #333;
  border-radius: 3px;

  &:hover {
    background: #ccc;
  };
  
  &.active {
    color: #aaa;
    &:hover {
      background: none;
      cursor:initial;
    };
  }
}
</style>
