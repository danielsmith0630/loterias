import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Image, View } from 'react-native';
import NetInfo from "@react-native-community/netinfo";
import DropdownAlert from 'react-native-dropdownalert';
import SplashScreen from 'react-native-splash-screen';
import I18n from 'react-native-i18n';
import ExitApp from 'react-native-exit-app';

import CONFIG from '../config';
import { setIni } from '../actions/global';
import { Images, Styles } from '../theme';
import Api from '../apis';
import CommonWidget from '../components/custom/CommonWidget';

import MainScreen from './MainScreen';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      initialized: false
    };
    CONFIG.VARIABLES.app = this;
  }

  async componentDidMount() {
    setTimeout(() => { SplashScreen.hide(); }, 800);
    await this.initialize();
  }

  async initialize() {
    NetInfo.addEventListener(state => this.handleConnectionChange.bind(this));
    await Api.getConfig();
    const ini = await Api.getIni();
    if (ini === null) {
      this.alertWithType('error', I18n.t('error'), I18n.t('there_is_no_internet_connection'));
      setTimeout(() => {
        ExitApp.exitApp();
      }, 2000);
    } else {
      await this.props.setIni(ini);
      await this.setState({ initialized: true });
    }
  }

  alertWithType(type, title, message) {
    this.alert.alertWithType(type, title, message);
  }

  handleConnectionChange(connectionInfo) {
    if (connectionInfo.type === 'none' || connectionInfo.type === 'unknown') {
      this.alertWithType('error', I18n.t('error'), I18n.t('there_is_no_internet_connection'));
      setTimeout(() => {
        ExitApp.exitApp();
      }, 2000);
    }
  }

  render() {
    const renderContent = this.state.initialized ? (
      <MainScreen />
    ) : (
      <View style={Styles.container}>
        <Image style={Styles.background} source={Images.splash} resizeMode="cover" />
        {CommonWidget.renderActivityIndicator()}
      </View>
    );

    return (
      <View style={Styles.container}>
        {renderContent}
        <DropdownAlert ref={(ref) => { this.alert = ref; }} />
      </View>
    );
  }
}

const mapStateToProps = state => ({
  global: state.get('global')
});

const mapDispatchToProps = dispatch => ({
  dispatch,
  setIni: ini => dispatch(setIni(ini))
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
