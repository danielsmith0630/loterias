import React, { Component } from 'react';
import {
  Animated, Image, Text, TouchableOpacity, View
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

import AppHelper from '../../helpers/AppHelper';
import { Colors, Fonts, Metrics } from '../../theme';
import CONFIG from '../../config';

const { MENU_TYPE } = CONFIG.ENUMS;

const styles = {
  breedCrumb: {
    backgroundColor: Colors.breedCrumbBackground,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderColor: Colors.breedCrumbBorder,
    borderBottomWidth: 1,
    paddingHorizontal: Metrics.paddingDefault,
    height: (Metrics.paddingDefault + Metrics.iconDefault)
  },
  breedCrumbSide: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  breedCrumbMain: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1
  },
  breedCrumbButton: {
    justifyContent: 'center',
    padding: Metrics.paddingDefault
  },
  breedCrumbCalendar: {
    marginVertical: -Metrics.marginDefault,
    width: (Metrics.paddingDefault * 2) + (Fonts.size.h6 * 1.5)
  },
  breedCrumbButtonIcon: {
    color: Colors.breedCrumbText,
    fontSize: Fonts.size.h2
  },
  breedCrumbButtonLeft: {
    paddingRight: Metrics.paddingDefault * 2,
    paddingLeft: Metrics.paddingDefault,
    marginLeft: -Metrics.marginDefault,
    paddingVertical: 0
  },
  breedCrumbButtonIconLeft: {
    color: Colors.breedCrumbText,
    fontSize: Fonts.size.h2 * 1.4
  },
  breedCrumbContent: {
    justifyContent: 'center'
  },
  breedCrumbImage: {
    width: Metrics.iconDefault,
    height: Metrics.iconDefault,
    marginRight: Metrics.marginDefault
  },
  breedCrumbTitle: {
    color: Colors.breedCrumbText,
    fontSize: Fonts.size.h5
  },
  breedCrumbDescription: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  breedCrumbDescriptionText: {
    color: Colors.breedCrumbTextMuted,
    fontSize: Fonts.size.default * 0.8
  },
  breedCrumbDescriptionIcon: {
    width: Fonts.size.tiny,
    height: Fonts.size.tiny,
    borderRadius: Fonts.size.tiny,
    marginRight: Metrics.marginDefault / 2
  }
};

class BreedCrumb extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      date: new Date()
    };
  }

  UNSAFE_componentWillMount() {
    this.animatedValue = new Animated.Value(0);
  }

  componentDidMount() {
    this.cycleAnimation();
  }

  onCalendarPress() {
    this.setState({
      show: true,
    });
  }

  onChangeDate(value) {
    let date = new Date(value);

    this.setState({
      show: false,
      date
    });

    let yy = date.getFullYear();
    let mm = date.getMonth() + 1;
    let dd = date.getDate();
    let full = yy + '-' + (mm > 9 ? '' : '0') + mm + '-' + (dd > 9 ? '' : '0') + dd;
    this.props.onCalendarPress(full);
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
    const { LAYOUTS } = CONFIG.VIEW_OPTIONS;
    const { menu } = this.props;
    const { show } = this.state;

    const caretColor = this.animatedValue.interpolate({
      inputRange: [0, 180, 180, 360],
      outputRange: [Colors.caret, Colors.caret, Colors.caretHighlight, Colors.caretHighlight]
    });

    let renderRecentlyUpdated = null;
    const breedCrumbCompanySame = ((!LAYOUTS.BREED_CRUMB_COMPANY_DISTINCTION) && menu.menuType === MENU_TYPE.COMPANY);

    if (breedCrumbCompanySame || menu.menuType === MENU_TYPE.GAME) {
      renderRecentlyUpdated = AppHelper.isRecentlyUpdated(menu.data.updated_at) ? (
        <Animated.View style={[styles.breedCrumbDescriptionIcon, { backgroundColor: caretColor }]} />
      ) : null;
    }

    return (
      <View style={styles.breedCrumb}>
        {
          menu.parentNode ? (
            <View style={styles.breedCrumbSide}>
              <TouchableOpacity style={styles.breedCrumbButtonLeft} onPress={this.props.onPress.bind(this, menu)}>
                <Icon style={styles.breedCrumbButtonIconLeft} name="angle-left" />
              </TouchableOpacity>
            </View>
          ) : null
        }
        {
          menu ? (
            <View style={[styles.breedCrumbMain]}>
              { menu.icon && (breedCrumbCompanySame || menu.menuType === MENU_TYPE.GAME) ? <Image style={styles.breedCrumbImage} source={menu.icon} resizeMode="contain" /> : null }
              <View style={styles.breedCrumbContent}>
                <Text style={styles.breedCrumbTitle}>{menu.text}</Text>
              </View>
            </View>
          ) : null
        }
        {
          (menu.menuType === MENU_TYPE.GAME || (menu.menuType === MENU_TYPE.COMPANY && LAYOUTS.SHOW_ALL_GAMES_AT_COMPANY)) ? (
            <View style={[styles.breedCrumbSide]}>
              <TouchableOpacity
                style={styles.breedCrumbButton}
                onPress={this.onCalendarPress.bind(this)}
              >
                <Icon style={styles.breedCrumbButtonIcon} name="calendar" />
              </TouchableOpacity>
              <DateTimePickerModal
                isVisible={show}
                mode="date"
                onConfirm={this.onChangeDate.bind(this)}
                onCancel={() => this.setState({show: false})}
              />
              <TouchableOpacity style={styles.breedCrumbButton} onPress={this.props.onRefreshPress}>
                <Icon style={styles.breedCrumbButtonIcon} name="refresh" />
              </TouchableOpacity>
            </View>
          ) : null
        }
      </View>
    );
  }
}

BreedCrumb.defaultProps = {
  onPress: () => {},
  onCalendarPress: () => {},
  onRefreshPress: () => {}
};
export default BreedCrumb;
