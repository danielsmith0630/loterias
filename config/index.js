import { Platform } from 'react-native';

const config = {
  API_ENDPOINTS: {
    MAIN: 'https://loteriasdominicanas.com/mobile-api-new',
    APP: 'https://loteriasdominicanas.com/mobile-api-new'
  },

  // ADMOB
  ADMOB: {
    REWARDED_MAX: 4,
    SECRETS: Platform.select({
      ios: {
        BANNER: 'ca-app-pub-1196303242456869/1822774033',
        INTERSTITIAL: 'ca-app-pub-1196303242456869/9595316835'
      },
      android: {
        BANNER: 'ca-app-pub-1196303242456869/7869307636',
        INTERSTITIAL: 'ca-app-pub-1196303242456869/8118583631'
      }
    })
  },

  SETTINGS: {
    ENCRYPT: true,
    REFRESH_INTERVAL: 30000,
    APP_NAME: 'app_dominicanas'
  },

  VIEW_OPTIONS: {
    THEME: 'blue1',
    INITIAL_MENU: {
      ID: 'home',
      OPTIONS: {
        toggle: true,
        trigger: true
      }
    },
    MENUS: {
      SHOW_COMPANIES: true,
      SHOW_POOLS: true,
      SHOW_STATS: true
    },
    LAYOUTS: {
      LOGO_ASPECT_RATIO: 247 / 110,
      SHOW_ALL_GAMES_AT_COMPANY: true,
      BREED_CRUMB_COMPANY_DISTINCTION: true,
      MENU_PRIMARY_DISTINCTION: true
    },
    NAVIGATIONS: {
      SHOW_TITLE: true
    }
  },
  ENUMS: {
    SCREEN_TYPE: {
      HOME: 1,
      MENU: 2,
      COMPANY: 3,
      GAME: 4,
      STAT_PREVIOUS_YEARS: 5,
      STAT_HOT_NUMBERS: 6,
      STAT_COLD_NUMBERS: 7,
      STAT_FORECASTS: 8,
      STAT_CHECK_NUMBERS: 9
    },
    MENU_TYPE: {
      PRIMARY: 1,
      COMPANY: 2,
      GAME: 3,
      STAT: 4
    }
  },

  VARIABLES: {
    app: null
  }
};

export default config;
