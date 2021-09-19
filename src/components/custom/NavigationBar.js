import React, { Component } from 'react';
import {
  Image, Text, TouchableOpacity, View, Dimensions
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import I18n from 'react-native-i18n';

import {
  Colors, Fonts, Images, Metrics
} from '../../theme';
import CONFIG from '../../config';

const styles = {
  navigationBar: {
    backgroundColor: Colors.navigationBackground,
    height: Metrics.navigationBarHeight * 1.2,
    paddingTop: Metrics.statusBarHeight * 1.5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowOffset: { width: 0, height: 1 },
    shadowColor: Colors.navigationShadow,
    shadowOpacity: 0.4,
    zIndex: 10
  },
  navigationLeft: {
    flexDirection: 'row',
    justifyContent: 'center'
  },
  navigationRight: {
    flexDirection: 'row',
    justifyContent: 'center'
  },
  navigationButton: {
    padding: Metrics.paddingDefault
  },
  navigationButtonIcon: {
    color: Colors.navigationText,
    fontSize: Fonts.size.h2
  },
  navigationTitle: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    marginLeft: -Metrics.marginDefault,
    paddingTop: Metrics.statusBarHeight * 1.5,
    flexDirection: 'row'
  },
  navigationImage: {
    height: Metrics.navigationBarHeight - Metrics.statusBarHeight / 2,
    width: (Metrics.navigationBarHeight - Metrics.statusBarHeight / 2) * CONFIG.VIEW_OPTIONS.LAYOUTS.LOGO_ASPECT_RATIO,
    marginRight: Metrics.marginDefault
  },
  navigationImageSmall: {
    height:
      Dimensions.get('window').width > 360
      ? Metrics.navigationBarHeight - Metrics.statusBarHeight / 2 - Metrics.paddingDefault
      : Metrics.navigationBarHeight - Metrics.statusBarHeight - Metrics.paddingDefault,
    marginTop: Dimensions.get('window').width > 360 ? 0 : 10,
    width:
      Dimensions.get('window').width > 360
      ? (Metrics.navigationBarHeight - Metrics.statusBarHeight / 2 - Metrics.paddingDefault) 
          * CONFIG.VIEW_OPTIONS.LAYOUTS.LOGO_ASPECT_RATIO
      : (Metrics.navigationBarHeight - Metrics.statusBarHeight - Metrics.paddingDefault) 
          * CONFIG.VIEW_OPTIONS.LAYOUTS.LOGO_ASPECT_RATIO
  },
  navigationContent: {

  },
  navigationText: {
    color: Colors.navigationText,
    fontSize: Dimensions.get('window').width > 360 ? Fonts.size.h6 : Fonts.size.default,
    fontWeight: 'bold',
    textAlign: 'center',
    width: Dimensions.get('window').width > 360 ? 'auto' : 100
  },
  navigationDescription: {
    flexDirection: 'row'
  },
  navigationDescriptionText: {
    color: Colors.navigationText,
    fontSize: Fonts.size.small
  },
  navigationDescriptionIcon: {
    color: Colors.caret,
    fontSize: Fonts.size.small,
    marginRight: Metrics.marginDefault / 2
  }
};

class NavigationBar extends Component {
  render() {
    const VIEW_OPTION_NAVIGATION_SHOW_TITLE = CONFIG.VIEW_OPTIONS.NAVIGATIONS.SHOW_TITLE;
    return (
      <View style={styles.navigationBar}>
        <View style={[styles.navigationTitle]}>
          <Image style={[styles.navigationImage, VIEW_OPTION_NAVIGATION_SHOW_TITLE ? styles.navigationImageSmall : null]} source={Images.logo} resizeMode="contain" />
          {
            VIEW_OPTION_NAVIGATION_SHOW_TITLE ? <Text style={styles.navigationText}>{I18n.t(CONFIG.SETTINGS.APP_NAME)}</Text> : null
          }
        </View>
        <View style={[styles.navigationLeft]}>
          <TouchableOpacity style={styles.navigationButton} onPress={this.props.onMenuPress}>
            <Icon style={styles.navigationButtonIcon} name="bars" />
          </TouchableOpacity>
        </View>
        <View style={[styles.navigationRight]}>
          <TouchableOpacity style={styles.navigationButton} onPress={this.props.onHomePress}>
            <Icon style={styles.navigationButtonIcon} name="home" />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

NavigationBar.defaultProps = {
  onMenuPress: () => {},
  onHomePress: () => {}
};
export default NavigationBar;
