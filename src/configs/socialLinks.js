export default [
  {
    id: 'person-page',
    url: 'https://www.amanze.me',
    title: 'Personal Website',
    iconUrl: 'https://avataaars.io/?avatarStyle=Transparent&topType=ShortHairShortCurly&accessoriesType=Prescription02&hairColor=Black&facialHairType=Blank&clotheType=Hoodie&clotheColor=White&eyeType=Default&eyebrowType=DefaultNatural&mouthType=Default&skinColor=Light',
    subTitle: 'This is personal portfolio website page',
    colors: {
      cardColor: '#26c6da',
      cardTheme: 'dark'
    }
  },
  {
    id: 'yt-page',
    url: 'https://www.youtube.com/channel/UCa475eqLbfWj2wRbdhQU6fA',
    title: 'Youtube',
    icon: 'fab fa-youtube',
    subTitle: 'This is my youtube channel',
    colors: {
      cardColor: '#ef9a9a',
      cardTheme: 'dark'
    }
  },
  {
    id: 'fb-page',
    url: 'https://www.facebook.com/africoder',
    title: 'Facebook difudifudi',
    icon: 'fab fa-facebook',
    subTitle: 'This is my Facebook Page',
    colors: {
      cardColor: '#1877f2',
      cardTheme: 'dark'
    }
  },
  {
    id: 'more-social',
    title: 'More SocialLinks',
    subTitle: 'This is a collection of SocialLinks',
    children: [
      {
        id: 'linkseption',
        title: 'Linkseption',
        subTitle: 'This is a collection of SocialLinks',
        children: [
          {
            id: 'linkseption',
            title: 'Linkseption',
            subTitle: 'This is a collection of SocialLinks',
            children: [
              {
                id: 'linkseption',
                title: 'Linkseption',
                subTitle: 'This is a collection of SocialLinks',
              },
            ]
          },
        ]
      },
      {
        title: 'Broken Link',
        iconUrl: 'https://avataaars.io/?avatarStyle=Transparent&topType=ShortHairShortCurly&accessoriesType=Prescription02&hairColor=Black&facialHairType=Blank&clotheType=Hoodie&clotheColor=White&eyeType=Default&eyebrowType=DefaultNatural&mouthType=Default&skinColor=Light',
        subTitle: 'Coming soon...',
      }
    ]
  },
]