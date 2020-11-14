<template>
  <v-container>
    <div v-if="showPage">
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
            <v-toolbar-title>{{activeSiteLink.title}}</v-toolbar-title>
            <v-spacer></v-spacer>
          </v-toolbar>
          <v-row>
            <v-col v-if="activeSiteLink.page" :class="{
              'col-12 col-sm-12 col-md-8 col-lg-9 col-xl-10': activeSiteLink.page && activeSiteLink.children,
              'col-12': activeSiteLink.page && !activeSiteLink.children,
            }">
              <div style="height: 100%; width: 100%">
                <vue-friendly-iframe
                  ref="previewIframe"
                  :src="'about:blank'"
                  @load="onLoadIframe(activeSiteLink.page)"
                />
              </div>
            </v-col>
            <v-col v-if="activeSiteLink.children" :class="{
              'col-12 col-sm-12 col-md-4 col-lg-3 col-xl-2': activeSiteLink.page && activeSiteLink.children,
              'col-12': !activeSiteLink.page && activeSiteLink.children,
            }">
              <div>
                <CardListItem
                  v-for="(siteLink, pos) in activeSiteLink.children"
                  :key="pos"
                  :siteLink="siteLink"
                  @click="siteLinkClicked(siteLink)"
                />
              </div>
            </v-col>
            <div v-else-if="!activeSiteLink.children && !activeSiteLink.url && !activeSiteLink.page">
              This SiteLink is Neither a folder of URL. Please check your configuration for this SiteLink
            </div>
          </v-row>
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

    </div>
    <div
      v-if="!activeSiteLink.children && activeSiteLink.url"
    >
      <center>
        <div>
          <h1>Redirecting now</h1>
        </div>
        <div>If it doesn't redirect automatically, please click <a :href="activeSiteLink.url">here</a></div>
      </center>
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
  import homeConfig from "../configs/homeConfig";
  import VueFriendlyIframe from 'vue-friendly-iframe';
  import Vue from 'vue';
  Vue.use(VueFriendlyIframe);

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
      activeSiteLink: {
        title: 'Home',
        children: []
      },
      snackbar: false,
      snackbarText: '',
      showPage: false,
      showNotFound: false,
    }),
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
        this.breadcrumbLinks = [homeConfig];
        this.activeSiteLink = this.breadcrumbLinks[0];

        this.routeIds.forEach((id, pos) => {
          if (!(pos === 0 && id === '')) {
            const siteLink = (this.activeSiteLink.children || []).find((link) => link.id === id)

            if (siteLink) {
              this.breadcrumbLinks.push(siteLink);
              this.activeSiteLink = siteLink;
            } else {
              this.showNotFound = true;
            }
          }
        })
        this.showPage = true;

        if (!(this.activeSiteLink.children || this.activeSiteLink.page)) {
          // handle siteLink
          this.siteLinkClicked(this.activeSiteLink, { redirectOnNewTab: false });
        }
      },
      siteLinkClicked(siteLink, options = { redirectOnNewTab: true }) {
        if (siteLink.children || siteLink.page) {
          let link = (this.breadcrumbLinks.map((breadcrumb) => breadcrumb.id).join('/') || '/')
          link = link + (!link.endsWith('/') ? '/' : '') + siteLink.id;
          this.$router.push(link);
        } else if (siteLink.url) {
          options.redirectOnNewTab === true ?
            window.open(siteLink.url, "_blank") :
            window.location.href = siteLink.url;
        } else {
          this.showSnackbarMessage('Link is missing');
          console.warn('SiteLink Config Error - Please contact site owner to configure src/config/siteLinks.js properly')
        }
      },
      setBreadcrumb(siteLink, pos) {
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
      },
      onLoadIframe(page) {
        const previewIframe = this.$refs.previewIframe;
        if (!previewIframe) return;
        const iframe = previewIframe.iframeEl;
        iframe.onload = () => {
          const height = iframe.contentDocument.querySelector('body').clientHeight + 20;
          iframe.style.height = `${height}px`;
        };
        // Set attributes for iFrame
        iframe.width = '100%';
        iframe.height = '100%';
        // This for the src makes it 'friendly'
        iframe.src = 'about:blank';

        /*eslint no-useless-escape: "off"*/
        const css = `<style>${page.css}<\/style>`;
        const js = `<script>${page.js}<\/script>`;
        const content = '<!DOCTYPE html>' + '<html><head><title>Rendered HTML from Message</title>' + css + '</head><body>' + page.html + js + '</body></html>';

        // Use the JavaScript methods to write to the iFrame, then close it
        iframe.contentWindow.document.open('text/html', 'replace');
        iframe.contentWindow.document.write(content);
        iframe.contentWindow.document.close();
      },
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

.vue-friendly-iframe {
  // min-height: 50vh;
  iframe {
    visibility: initial !important;
    position: initial !important;
    top: 0 !important;
    border: none;
    min-height: 80vh !important;
  }
}
</style>
