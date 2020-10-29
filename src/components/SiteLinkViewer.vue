<template>
  <v-container v-if="showPage">
    <div v-if="!showNotFound">
      <div>
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
          <v-toolbar-title>{{activeSocialLink.title}}</v-toolbar-title>
          <v-spacer></v-spacer>
        </v-toolbar>
        <v-row>
          <v-col v-if="activeSocialLink.children">
            <CardListItem
              v-for="(socialLink, pos) in activeSocialLink.children"
              :key="pos"
              :title="socialLink.title"
              :icon="socialLink.icon || (!socialLink.children && !socialLink.url ? 'fa-question' : null)"
              :iconUrl="socialLink.iconUrl"
              :subTitle="socialLink.subTitle"
              :colors="socialLink.colors"
              :isFolder="!!socialLink.children"
              @click="socialLinkClicked(socialLink)"
            />
          </v-col>
          <v-col v-else>
            This SiteLink is Neither a folder of URL. Please check your configuration for this SiteLink
          </v-col>
        </v-row>
      </div>
      <div
        v-if="!activeSocialLink.children && activeSocialLink.url"
      >
        <center>
          <div>
            <h1>Redirecting now</h1>
          </div>
          <div>If it doesn't redirect automatically, please click <a :href="this.activeSiteLink.url">here</a></div>
        </center>
      </div>
    </div>
    <div v-else>
      <div>
        <center>
          <h1>Page or Link NOT FOUND</h1>
        </center>
      </div>
      <div>
        <center>
          <v-btn @click="$router.push('/')">Go To Home</v-btn>
        </center>
      </div>
    </div>
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
  import socialLinks from "../configs/socialLinks";

  export default {
    name: 'SiteLinkViewer',
    components: {
      CardListItem,
    },
    props: {
      routeIds: {
        type: Array,
        default: () => []
      },
    }, 
    data: () => ({
      breadcrumbLinks: [],
      activeSocialLink: {
        title: 'Home',
        children: []
      },
      snackbar: false,
      snackbarText: '',
      showPage: false,
      showNotFound: false,
    }),
    computed: {
      socialLinks() {
        return socialLinks
      }
    },
    mounted() {
      this.initPath();
    },  
    watch:{
      $route (to, from){
        if (to.path !== from.path) {
          this.initPath();
        }
      }
    },
    methods: {
      initPath() {
        this.breadcrumbLinks = [{
          title: 'Home',
          children: this.socialLinks,
        }];
        this.activeSocialLink = this.breadcrumbLinks[0];


        this.routeIds.forEach((id, pos) => {
          if (!(pos === 0 && id === '')) {
            const socialLink = this.activeSocialLink.children.find((link) => link.id === id)
            console.log({socialLink})
            if (socialLink) {
              this.breadcrumbLinks.push(socialLink);
              this.activeSocialLink = socialLink;
            } else {
              this.showNotFound = true;
            }
          }
        })
        this.showPage = true;

        if (!this.activeSocialLink.children) {
          // handle socialLink
          this.socialLinkClicked(this.activeSocialLink, { redirectOnNewTab: false });
        }
      },
      socialLinkClicked(socialLink, options = { redirectOnNewTab: true }) {
        if (socialLink.children) {
          let link = (this.breadcrumbLinks.map((breadcrumb) => breadcrumb.id).join('/') || '/')
          link = link + (!link.endsWith('/') ? '/' : '') + socialLink.id;
          this.$router.push(link);
        } else if (socialLink.url) {
          options.redirectOnNewTab === true ?
            window.open(socialLink.url, "_blank") :
            window.location.href = socialLink.url;
        } else {
          this.showSnackbarMessage('Link is missing');
          console.warn('SocialLink Config Error - Please contact site owner to configure src/config/socialLinks.js properly')
        }
      },
      setBreadcrumb(socialLink, pos) {
        if (pos !== (this.breadcrumbLinks.length - 1)) {
          this.breadcrumbLinks = this.breadcrumbLinks.slice(0, pos + 1);
          const link = this.breadcrumbLinks.map((breadcrumb) => breadcrumb.id).join('/') || '/';
          this.$router.push(link);
        }
      },
      goBack() {
        if (this.breadcrumbLinks.length > 1) {
          this.breadcrumbLinks = this.breadcrumbLinks.slice(0, this.breadcrumbLinks.length - 1);
          const link = this.breadcrumbLinks.map((breadcrumb) => breadcrumb.id).join('/') || '/';
          this.$router.push(link);
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
