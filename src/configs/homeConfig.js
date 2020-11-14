import siteLinks from './siteLinks'

export default {
  title: 'Home',
  children: siteLinks,
  page: {
    html: require('./pages/home/html').default,
    css: require('./pages/home/css').default,
    js: require('./pages/home/js').default,
  },
}
