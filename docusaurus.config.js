module.exports = {
  title: 'ink! documentation',
  tagline: 'documentation for ink!',
  url: 'https://use.ink',
  baseUrl: '/',
  onBrokenLinks: 'throw',
  favicon: 'img/favicon.png',
  organizationName: 'paritytech',
  onBrokenLinks: 'warn',
  projectName: 'ink-docs',
  stylesheets: [
    'fonts/fonts.css'
  ],
  themes: [
    [
      require.resolve("@easyops-cn/docusaurus-search-local"),
      {
        indexPages: true,
      }
    ]
  ],
  themeConfig: {
    prism: {
      theme: require('prism-react-renderer/themes/duotoneDark'),
      additionalLanguages: ['rust', 'json']
    },
    colorMode: {
      defaultMode: 'dark',
      disableSwitch: false
    },
    navbar: {
      title: '',
      logo: {
        alt: 'ink!',
        src: 'img/text-black.svg',
        srcDark: '/img/text-white.svg',
      },
      items: [
        {
          type: 'docsVersionDropdown',
          position: 'right',
          dropdownActiveClassDisabled: true,
        },
        {
          type: 'localeDropdown',
          position: 'right',
        }
      ],
    },
  },
  presets: [
    ['@docusaurus/preset-classic', {
      docs: {
        sidebarPath: require.resolve('./sidebars.js'),
        editUrl: 'https://github.com/paritytech/ink-docs/edit/master/',
        routeBasePath: '/',
        lastVersion: 'current',
        versions: {
          '4.0.0-alpha.1': {
            label: '4.0.0-alpha.1',
            path: '4.0.0-alpha.1',
            banner: 'none',
          },
          current: {
            label: '3.x.x',
            path: '',
            banner: 'none',
          },
        },
      },
      blog: {
        showReadingTime: true,
        editUrl: 'https://github.com/paritytech/ink-docs/edit/master/',
      },
      theme: {
        customCss: [require.resolve('./src/css/custom.css')],
      },
    }],
  ],
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'es'],
    localeConfigs: {
      en: {
        htmlLang: 'en-GB',
        label: 'English'
      },
      es: {
        label: 'Español'
      }
    },
  },
};
