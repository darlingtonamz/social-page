import siteLinks from './siteLinks'

export default {
  title: 'Home',
  children: siteLinks,
  page: {
    // html: `<div style="padding: 10px;">
    //   <h1>This is an HTML content sdsd</h1>
    //   <a href="https://google.com" target="_blank">ererer</a>
    // </div>`,
    html: require('./pages/home/html').default,
    css: require('./pages/home/css').default,
    js: require('./pages/home/js').default,
  },
}