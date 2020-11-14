# social-page
This is a project that help Social influencers to easily create a SocialMedia landing page where all their social accounts are linked.

## Project setup
```
yarn install
```

### Compiles and hot-reloads for development
```
yarn serve
```

### Compiles and minifies for production
```
yarn build
```

### Lints and fixes files
```
yarn lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

## Deploying Your Own
To deploy your own SocialPage Wesite for Free, please follow the steps below.

### 1. Fork the Code

### 2. Update the Configs
In the code file `src/configs/` there are two file which can be configured in your own FORKed version of the code.

#### - App Configuartion: (`src/configs/appConfig.js`) 

In this file you can configure the general look of the Website using JSON. The only configurations there are:

Config     | description
-------    |---
background | This is the background color of the website. It can accept any css or hex value
siteName   | This is name that is displayed on the tile bar of the site
---
#### - Social Link Configuartion: (`src/configs/siteLink.js`) 

In this file you can configure the Social Links (like your social media link) on the Website using JSON. 

The only configurations is an array/list of Social Links. Social Links are Either:

- Redirect URLs
- Collection of SiteLinks (folder)

SiteLink Object has the following fields

Field      | description
-------    |---
url        | The URL which you will be redirected to is the SiteLink card is clicked 
icon       | The icon displayed in the avatar using [font-awesome](https://fontawesome.com/icons) 
iconUrl    | The icon displayed in the avatar using an image URL
title      | The title of the Social Link Card
subTitle   | This sub-tile under the `title` of the Social Link Card
children   | This is a list of SiteLinks under this SiteLink
colors     | This is an object that holds the color configuration of the SiteLink card
colors.cardColor     | This is the background color of the SiteLink Card
colors.cardTheme     | This is the theme ['dark', 'light'] of the SiteLink Card

---

#### - Home SiteLink Configuartion: (`src/configs/homeConfig.js`) 

This is the landing/Main `SiteLink` for the whole application.

---

### Deploy it

Click the button below (after you have Forked and configured it with your own SiteLinks)

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/darlingtonamz/social-page)