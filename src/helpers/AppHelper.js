import I18n from 'react-native-i18n';
import moment from 'moment';

import CONFIG from '../config';
import { Images } from '../theme';

const AppHelper = {

  _getCompanyMenuNode: (company) => {
    const { SCREEN_TYPE, MENU_TYPE } = CONFIG.ENUMS;
    const { SHOW_ALL_GAMES_AT_COMPANY } = CONFIG.VIEW_OPTIONS.LAYOUTS;
    const node = {
      id: `company_${company.id}`,
      icon: company.logo ? { uri: company.logo } : null,
      text: company.title,
      description: company.description,
      screenType: (SHOW_ALL_GAMES_AT_COMPANY ? SCREEN_TYPE.COMPANY : SCREEN_TYPE.MENU),
      menuType: MENU_TYPE.COMPANY,
      expanded: false,
      collapsable: false,
      childNodes: [],
      data: company
    };
    company.games.forEach((game) => {
      const childNode = AppHelper._getGameMenuNode(game, 'company');
      node.childNodes.push(childNode);
    });
    return node;
  },

  _getGameMenuNode: (game, prefix) => {
    const { SCREEN_TYPE, MENU_TYPE } = CONFIG.ENUMS;
    return {
      id: `${prefix}_game_${game.id}`,
      icon: game.logo ? { uri: game.logo } : null,
      text: game.title,
      description: game.description,
      screenType: SCREEN_TYPE.GAME,
      menuType: MENU_TYPE.GAME,
      data: game
    };
  },

  _getCompaniesMenuNode: (companies, description) => {
    const { SCREEN_TYPE, MENU_TYPE } = CONFIG.ENUMS;
    const node = {
      id: 'companies',
      text: I18n.t('lotteries'),
      menuType: MENU_TYPE.PRIMARY,
      screenType: SCREEN_TYPE.MENU,
      collapsable: true,
      expanded: true,
      description,
      childNodes: []
    };

    if (companies.length === 1) {
      const { games } = companies[0];
      games.forEach((game) => {
        const childNode = AppHelper._getGameMenuNode(game, 'company');
        node.childNodes.push(childNode);
      });
    } else {
      companies.forEach((company) => {
        const childNode = AppHelper._getCompanyMenuNode(company);
        node.childNodes.push(childNode);
      });
    }
    return node;
  },

  _getPoolsMenuNode: (companies) => {
    const { SCREEN_TYPE, MENU_TYPE } = CONFIG.ENUMS;
    const node = {
      id: 'pools',
      text: I18n.t('pools'),
      screenType: SCREEN_TYPE.MENU,
      menuType: MENU_TYPE.PRIMARY,
      collapsable: true,
      expanded: false,
      childNodes: []
    };

    companies.forEach((company) => {
      company.games.forEach((game) => {
        if (game.quinielia) {
          const childNode = AppHelper._getGameMenuNode(game, 'pools');
          node.childNodes.push(childNode);
        }
      });
    });
    return node;
  },

  _getStatsMenuNode: () => {
    const { SCREEN_TYPE, MENU_TYPE } = CONFIG.ENUMS;
    return {
      id: 'stats',
      text: I18n.t('stats'),
      menuType: MENU_TYPE.PRIMARY,
      screenType: SCREEN_TYPE.MENU,
      collapsable: true,
      expanded: true,
      childNodes: [
        {
          id: 'stat_previous_year',
          icon: Images.icon_calendar,
          text: I18n.t('previous_years'),
          menuType: MENU_TYPE.STAT,
          screenType: SCREEN_TYPE.STAT_PREVIOUS_YEARS
        }, {
          id: 'stat_hot_numbers',
          text: I18n.t('hot_numbers'),
          icon: Images.icon_hot,
          menuType: MENU_TYPE.STAT,
          screenType: SCREEN_TYPE.STAT_HOT_NUMBERS
        }, {
          id: 'stat_cold_numbers',
          icon: Images.icon_cold,
          text: I18n.t('cold_numbers'),
          menuType: MENU_TYPE.STAT,
          screenType: SCREEN_TYPE.STAT_COLD_NUMBERS
        }, {
          id: 'stat_forecasts',
          icon: Images.icon_graph,
          text: I18n.t('forecasts'),
          menuType: MENU_TYPE.STAT,
          screenType: SCREEN_TYPE.STAT_FORECASTS
        }, {
          id: 'stat_check_numbers',
          icon: Images.icon_search,
          text: I18n.t('check_numbers'),
          menuType: MENU_TYPE.STAT,
          screenType: SCREEN_TYPE.STAT_CHECK_NUMBERS
        }
      ]
    };
  },

  getMenuNode: (data) => {
    const VIEW_OPTION_MENUS = CONFIG.VIEW_OPTIONS.MENUS;
    const { SCREEN_TYPE, MENU_TYPE } = CONFIG.ENUMS;
    const { companies, description } = data;
    const node = {
      id: 'home',
      text: I18n.t(CONFIG.SETTINGS.APP_NAME),
      menuType: MENU_TYPE.PRIMARY,
      screenType: SCREEN_TYPE.HOME,
      childNodes: []
    };

    let childCount = 0;
    if (VIEW_OPTION_MENUS.SHOW_COMPANIES) {
      const companiesNode = AppHelper._getCompaniesMenuNode(companies, description);
      childCount += 1;
      node.childNodes.push(companiesNode);
    }

    if (VIEW_OPTION_MENUS.SHOW_POOLS) {
      const poolsNode = AppHelper._getPoolsMenuNode(companies);
      node.childNodes.push(poolsNode);
      childCount += 2;
    }

    if (VIEW_OPTION_MENUS.SHOW_STATS) {
      const statNode = AppHelper._getStatsMenuNode();
      node.childNodes.push(statNode);
      childCount += 3;
    }

    if (childCount === 1) {
      return node.childNodes[0];
    }
    return node;
  },

  _getGameMenuListNode(game, prefix) {
    // const date = new Date();
    const data = game;
    // data.updated_at = moment(date).format('DD-MM-YYYY | h:mm:ss a');
    return {
      id: `${prefix}_game_${game.id}`,
      data
    };
  },

  _getCompanyMenuListNode(company) {
    // const date = new Date();
    const data = company;
    // data.updated_at = moment(date).format('DD-MM-YYYY | h:mm:ss a');
    return {
      id: `company_${company.id}`,
      data
    };
  },

  _getCompaniesMenuList(companies) {
    const list = [];
    companies.forEach((company) => {
      const node = AppHelper._getCompanyMenuListNode(company);
      list.push(node);
      company.games.forEach((game) => {
        const childNode = AppHelper._getGameMenuListNode(game, 'company');
        list.push(childNode);
      });
    });
    return list;
  },

  _getPoolsMenuList(companies) {
    const list = [];
    companies.forEach((company) => {
      company.games.forEach((game) => {
        if (game.quinielia) {
          const node = AppHelper._getGameMenuListNode(game, 'pools');
          list.push(node);
        }
      });
    });
    return list;
  },

  getMenuList: (data) => {
    const VIEW_OPTION_MENUS = CONFIG.VIEW_OPTIONS.MENUS;
    const { companies } = data;
    const list = [];

    if (VIEW_OPTION_MENUS.SHOW_COMPANIES) {
      const companiesList = AppHelper._getCompaniesMenuList(companies);
      list.push(...companiesList);
    }

    if (VIEW_OPTION_MENUS.SHOW_POOLS) {
      const poolsList = AppHelper._getPoolsMenuList(companies);
      list.push(...poolsList);
    }
    return list;
  },

  isRecentlyUpdated(updated_at) {
    const todayDate = new Date();
    return updated_at.indexOf(moment(todayDate).format('DD-MM-YYYY')) === 0;
  },

  buildHttpQuery: (params) => {
    const str = [];
    Object.keys(params).forEach((key) => {
      const value = params[key];
      str.push(`${encodeURIComponent(key)}=${encodeURIComponent(value)}`);
    });
    return str.join('&');
  },

  convertChartData(stats) {
    const keys = Object.keys(stats);
    const data = [];
    for (let i = 0; i < keys.length; i++) {
      data.push({ name: keys[i], v: stats[keys[i]] });
    }
    data.sort((a, b) => a.name - b.name);

    const mainData = [];
    for (let i = 0; i < data.length; i++) {
      const tempData = [];
      tempData.push(data[i]);
      mainData.push(tempData);
    }
    return mainData;
  },

  convertWaybackData(stats) {
    const keys = Object.keys(stats);
    const data = [];
    for (let i = 0; i < keys.length; i++) {
      data.push({ title: keys[i], content: stats[keys[i]] });
    }
    data.sort((a, b) => b.title - a.title);
    return data;
  }
};

export default AppHelper;
