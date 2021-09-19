import React, { Component } from 'react';
import {
  Animated, Image, Text, TouchableOpacity, View
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import AppHelper from '../../helpers/AppHelper';
import { Colors, Fonts, Metrics } from '../../theme';
import CONFIG from '../../config';

const { MENU_TYPE } = CONFIG.ENUMS;

const styles = {
  menuItem: {
    backgroundColor: Colors.menuItemBackground,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderColor: Colors.menuItemBorder,
    borderBottomWidth: 1,
    paddingHorizontal: Metrics.paddingDefault,
    height: Metrics.iconDefault + Metrics.paddingDefault
  },
  menuItemHighlight: {
    backgroundColor: Colors.menuItemBackgroundHighlight,
    borderColor: Colors.menuItemBorderHighlight
  },
  menuItemMain: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  menuItemRight: {
    flexDirection: 'row'
  },
  menuItemRightIcon: {
    color: Colors.menuItemText,
    fontSize: Fonts.size.h3
  },
  menuItemRightIconHilight: {
    color: Colors.menuItemTextHighlight
  },
  menuItemContent: {
    minHeight: Metrics.iconDefault,
    justifyContent: 'center'
  },
  menuItemImage: {
    width: Metrics.iconDefault,
    height: Metrics.iconDefault,
    marginRight: Metrics.marginDefault
  },
  menuItemTitle: {
    color: Colors.menuItemText,
    fontSize: Fonts.size.h5
  },
  menuItemTitleHighlight: {
    color: Colors.menuItemTextHighlight
  },
  menuItemDescription: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 10
  },
  menuItemDescriptionText: {
    color: Colors.menuItemTextMuted,
    fontSize: Fonts.size.default
  },
  menuItemDescriptionTextHilight: {
    color: Colors.menuItemTextMutedHighlight
  },
  menuItemDescriptionIcon: {
    width: Fonts.size.tiny,
    height: Fonts.size.tiny,
    borderRadius: Fonts.size.tiny,
    marginRight: Metrics.marginDefault / 2
  }
};

class MenuItem extends Component {
  UNSAFE_componentWillMount() {
    this.animatedValue = new Animated.Value(0);
  }

  componentDidMount() {
    this.cycleAnimation();
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


  render() {
    const { menu } = this.props;
    const caretColor = this.animatedValue.interpolate({
      inputRange: [0, 180, 180, 360],
      outputRange: [Colors.caret, Colors.caret, Colors.caretHighlight, Colors.caretHighlight]
    });

    let renderRecentlyUpdated = null;
    if (menu && (menu.menuType === MENU_TYPE.COMPANY || menu.menuType === MENU_TYPE.GAME)) {
      renderRecentlyUpdated = AppHelper.isRecentlyUpdated(menu.data.updated_at) ? (
        <Animated.View style={[styles.menuItemDescriptionIcon, { backgroundColor: caretColor }]} />
      ) : null;
    }
    const highlight = (CONFIG.VIEW_OPTIONS.MENU_PRIMARY_DISTINCTION || menu.menuType === MENU_TYPE.PRIMARY);

    return (
      <TouchableOpacity style={[styles.menuItem, highlight ? styles.menuItemHighlight : null]} activeOpacity={0.6} onPress={this.props.onPress.bind(this, menu)}>
        {
          menu ? (
            <View style={[styles.menuItemMain]}>
              { menu.icon ? <Image style={styles.menuItemImage} source={menu.icon} resizeMode="contain" /> : null }
              <View style={styles.menuItemContent}>
                <Text style={[styles.menuItemTitle, highlight ? styles.menuItemTitleHighlight : null]}>{menu.text}</Text>
              </View>
            </View>
          ) : null
        }
        <View style={[styles.menuItemRight]}>
          {
            menu.menuType === MENU_TYPE.COMPANY ? (
              <View style={styles.menuItemDescription}>
                {renderRecentlyUpdated}
                <Text style={[styles.menuItemDescriptionText, highlight ? styles.menuItemDescriptionTextHighlight : null]}>{menu.data.updated_at}</Text>
              </View>
            ) : null
          }
          <Icon style={[styles.menuItemRightIcon, highlight ? styles.menuItemRightIconHilight : null]} name="angle-right" />
        </View>
      </TouchableOpacity>
    );
  }
}

MenuItem.defaultProps = {
  onPress: () => {}
};
export default MenuItem;
