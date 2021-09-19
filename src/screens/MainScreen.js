import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Animated, AppState, BackHandler, Image, Text, View
} from 'react-native';

import Drawer from 'react-native-drawer';
import Icon from 'react-native-vector-icons/FontAwesome';

import firebase from 'react-native-firebase';
import { increaseRewarded } from '../actions/global';
import TreeView from '../components/general/TreeView';
import NavigationBar from '../components/custom/NavigationBar';
import CommonWidget from '../components/custom/CommonWidget';
import AppHelper from '../helpers/AppHelper';
import { Colors, Metrics, Styles } from '../theme';
import CONFIG from '../config';
import Api from '../apis';

import HomeScreen from './HomeScreen';
import MenuScreen from './MenuScreen';
import CompanyScreen from './CompanyScreen';
import GameScreen from './GameScreen';
import StatPreviousYearsScreen from './StatPreviousYearsScreen';
import StatCheckNumbersScreen from './StatCheckNumbersScreen';
import StatColdNumbersScreen from './StatColdNumbersScreen';
import StatHotNumbersScreen from './StatHotNumbersScreen';
import StatForecastsScreen from './StatForecastsScreen';

const { MENU_TYPE, SCREEN_TYPE } = CONFIG.ENUMS;

class MainScreen extends Component {
  static instance = null;

  constructor(props) {
    super(props);
    this.ini = this.props.global.ini;
    this.state = {
      menuItem: null,
      loadingRefreshIni: false
    };
    this.menuData = AppHelper.getMenuNode(this.ini);
    this.unmounted = false;
    this.timerRefreshIni = null;
    this.currentScreen = null;
    this.requestInterstitial();
  }

  UNSAFE_componentWillMount() {
    this.animatedValue = new Animated.Value(0);
  }

  componentDidMount() {
    AppState.addEventListener('change', this.handleAppStateChange);
    this.backHandler = BackHandler.addEventListener('hardwareBackPress', this.hardwareBackPress);
    this.initialize();
    this.setIntervalRefeshIni();
    this.cycleAnimation();
  }

  UNSAFE_componentWillUnmount() {
    if (this.backHandler) {
      this.backHandler.remove();
      this.backHandler = null;
    }

    AppState.removeEventListener('change', this.handleAppStateChange);
    this.clearIntervalRefreshIni();
    this.unmounted = true;
  }

  onDrawerItemSelected(node, info, origin) {
    if (origin === 0 && !node.collapsable) {
      this.closeDrawer();
    }
    this.setState({
      menuItem: node
    });

    if (this.props.global.rewardedCount != 0 && this.props.global.rewardedCount % CONFIG.ADMOB.REWARDED_MAX == 0) {
      this.showInterstitial();
    }
    this.props.increaseRewarded();
  }

  onMenuPress(node) {
    if (this.drawerContent) {
      this.drawerContent.selectNode(node, { trigger: true, toggle: false });
    }
  }

  onMenuBackPress(node) {
    if (node.parentNode && this.drawerContent) {
      this.drawerContent.selectNode(node.parentNode, { trigger: true, toggle: false });
    }
  }

  onHomePress() {
    if (this.drawerContent) {
      this.drawerContent.selectNode(this.drawerContent.getRootNode());
    }
  }


  setIntervalRefeshIni() {
    this.clearIntervalRefreshIni();
    this.timerRefreshIni = setInterval(this.handleTimerRefreshIni.bind(this), CONFIG.SETTINGS.REFRESH_INTERVAL);
  }

  hardwareBackPress = () => {
    const { menuItem } = this.state;
    if (menuItem && menuItem.parentNode) {
      this.onMenuBackPress(menuItem);
      return true;
    }
    return false;
  }

  handleAppStateChange = (nextAppState) => {
    if (nextAppState === 'active') {
      this.handleTimerRefreshIni();
      this.setIntervalRefeshIni();
    } else {
      this.clearIntervalRefreshIni();
    }
  }

  async handleTimerRefreshIni() {
    if (this.state.loadingRefreshIni) {
      return;
    }
    this.setState({ loadingRefreshIni: true });
    const ini = await Api.getIni();
    if (!this.unmounted) {
      this.setState({ loadingRefreshIni: false });
      if (this.currentScreen && this.currentScreen.refresh) {
        this.currentScreen.refresh();
      }
    }
  }

  cycleAnimation() {
    this.animatedValue.setValue(0);
    Animated.timing(this.animatedValue, {
      toValue: 360,
      duration: 1500,
      useNativeDriver: true
    }).start(() => {
      this.cycleAnimation();
    });
  }

  clearIntervalRefreshIni() {
    if (this.timerRefreshIni) {
      clearInterval(this.timerRefreshIni);
      this.timerRefreshIni = null;
    }
  }

  initialize() {
    const { INITIAL_MENU } = CONFIG.VIEW_OPTIONS;
    this.drawerContent.selectNodeById(INITIAL_MENU.ID, INITIAL_MENU.OPTIONS);
  }

  closeDrawer() {
    this.drawer.close();
  }

  openDrawer() {
    this.drawer.open();
  }

  toggleDrawer() {
    if (this.drawer._open) {
      this.drawer.close();
    } else {
      this.drawer.open();
    }
  }

  requestInterstitial() {
    this.interstitial = firebase.admob().interstitial(CONFIG.ADMOB.SECRETS.INTERSTITIAL);

    const AdRequest = firebase.admob.AdRequest;
    const request = new AdRequest();

    this.interstitial.loadAd(request.build());

    this.interstitial.on('onAdClosed', () => {
      this.requestInterstitial();
    });
  }

  showInterstitial() {
    if (this.interstitial) {
      if (this.interstitial.isLoaded()) {
        this.interstitial.show();
      }
    }
  }

  keyExtractor(item, index) {
    return `${index}`;
  }

  renderDrawerItem(node, highlight) {
    let renderRecentlyUpdated = null;

    if (node && (node.menuType === MENU_TYPE.COMPANY || node.menuType === MENU_TYPE.GAME)) {
      const caretColor = this.animatedValue.interpolate({
        inputRange: [0, 180, 180, 360],
        outputRange: [Colors.caret, Colors.caret, Colors.caretHighlight, Colors.caretHighlight]
      });
      renderRecentlyUpdated = AppHelper.isRecentlyUpdated(node.data.updated_at) ? (
        <Animated.View style={[Styles.drawerItemDescriptionIcon, { backgroundColor: caretColor }]} />
      ) : null;
    }

    return (
      <View style={[Styles.drawerItem, highlight ? Styles.drawerItemHighlight : null, { paddingLeft: (node.depth) * Metrics.paddingDefault }]}>
        {node.icon ? <Image source={node.icon} style={[Styles.drawerItemIcon]} resizeMode="contain" /> : null}
        <View style={[Styles.drawerItemContent]}>
          <Text style={[Styles.drawerItemTitle, highlight ? Styles.drawerItemTextHighlight : Styles.drawerItemText]}>{node.text}</Text>
        </View>
        <Icon
          style={[Styles.drawerItemCollapsable, highlight ? Styles.drawerItemTextHighlight : Styles.drawerItemText]}
          name={node.expanded ? 'angle-down' : 'angle-right'} />
      </View>
    );
  }

  renderScreen() {
    const { menuItem } = this.state;
    if (menuItem === null) {
      return CommonWidget.renderActivityIndicator();
    }

    switch (menuItem.screenType) {
      case SCREEN_TYPE.HOME:
        return (
          <HomeScreen
            ref={(ref) => { this.currentScreen = ref; }}
            menu={menuItem}
            onMenuBackPress={this.onMenuBackPress.bind(this)}
            onMenuPress={this.onMenuPress.bind(this)}
          />
        );
      case SCREEN_TYPE.COMPANY:
        return (
          <CompanyScreen
            ref={(ref) => { this.currentScreen = ref; }}
            menu={menuItem}
            onMenuBackPress={this.onMenuBackPress.bind(this)}
            onMenuPress={this.onMenuPress.bind(this)}
          />
        );
      case SCREEN_TYPE.GAME:
        return (
          <GameScreen
            ref={(ref) => { this.currentScreen = ref; }}
            menu={menuItem}
            onMenuBackPress={this.onMenuBackPress.bind(this)}
            onMenuPress={this.onMenuPress.bind(this)}
          />
        );
      case SCREEN_TYPE.STAT_CHECK_NUMBERS:
        return (
          <StatCheckNumbersScreen
            ref={(ref) => { this.currentScreen = ref; }}
            menu={menuItem}
            onMenuBackPress={this.onMenuBackPress.bind(this)}
            onMenuPress={this.onMenuPress.bind(this)}
          />
        );
      case SCREEN_TYPE.STAT_COLD_NUMBERS:
        return (
          <StatColdNumbersScreen
            ref={(ref) => { this.currentScreen = ref; }}
            menu={menuItem}
            onMenuBackPress={this.onMenuBackPress.bind(this)}
            onMenuPress={this.onMenuPress.bind(this)}
          />
        );
      case SCREEN_TYPE.STAT_FORECASTS:
        return (
          <StatForecastsScreen
            ref={(ref) => { this.currentScreen = ref; }}
            menu={menuItem}
            onMenuBackPress={this.onMenuBackPress.bind(this)}
            onMenuPress={this.onMenuPress.bind(this)}
          />
        );
      case SCREEN_TYPE.STAT_HOT_NUMBERS:
        return (
          <StatHotNumbersScreen
            ref={(ref) => { this.currentScreen = ref; }}
            menu={menuItem}
            onMenuBackPress={this.onMenuBackPress.bind(this)}
            onMenuPress={this.onMenuPress.bind(this)}
          />
        );
      case SCREEN_TYPE.STAT_PREVIOUS_YEARS:
        return (
          <StatPreviousYearsScreen
            ref={(ref) => { this.currentScreen = ref; }}
            menu={menuItem}
            onMenuBackPress={this.onMenuBackPress.bind(this)}
            onMenuPress={this.onMenuPress.bind(this)}
          />
        );
      case SCREEN_TYPE.MENU:
      default:
        return (
          <MenuScreen
            menu={menuItem}
            onMenuBackPress={this.onMenuBackPress.bind(this)}
            onMenuPress={this.onMenuPress.bind(this)}
          />
        );
    }
  }

  render() {
    const Banner = firebase.admob.Banner;
    const AdRequest = firebase.admob.AdRequest;
    const request = new AdRequest();

    const drawerContent = (
      <TreeView
        data={this.menuData}
        ref={(ref) => { this.drawerContent = ref; }}
        renderContent={this.renderDrawerItem.bind(this)}
        onSelected={this.onDrawerItemSelected.bind(this)}
      />
    );
    return (
      <View style={[Styles.container, Styles.main]}>
        <NavigationBar
          navigation={this.state.menuItem}
          onMenuPress={this.toggleDrawer.bind(this)}
          onHomePress={this.onHomePress.bind(this)}
        />
        <Drawer
          content={drawerContent}
          type="overlay"
          side="left"
          openDrawerOffset={viewport => (viewport.width - 230)}
          closedDrawerOffset={0}
          tapToClose
          panThreshold={0}
          panCloseMask={0}
          initializeOpen={false}
          styles={Styles.drawer}
          tweenDuration={150}
          ref={(ref) => { this.drawer = ref; }}>
          <View style={Styles.container}>
            {this.state.menuItem === null ? CommonWidget.renderActivityIndicator() : this.renderScreen()}
          </View>
          <Banner
            unitId={CONFIG.ADMOB.SECRETS.BANNER}
            size={'SMART_BANNER'}
            request={request.build()}
          />
        </Drawer>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  global: state.get('global')
});

const mapDispatchToProps = dispatch => ({
  dispatch,
  increaseRewarded: initialize => dispatch(increaseRewarded(initialize))
});
export default connect(mapStateToProps, mapDispatchToProps)(MainScreen);
