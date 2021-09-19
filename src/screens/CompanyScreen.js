import React, { Component } from 'react';
import {
  AppState, FlatList, ScrollView, View, RefreshControl
} from 'react-native';
import moment from 'moment';

import Api from '../apis';
import { Styles } from '../theme';
import BreedCrumb from '../components/custom/BreedCrumb';
import MenuItem from '../components/custom/MenuItem';
import ScoreCard from '../components/custom/ScoreCard';
import CommonWidget from '../components/custom/CommonWidget';

class CompanyScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      date: null,
      result: null,
      menuList: this._configMenuList(this.props.menu)
    };
    this.unmounted = false;
  }

  componentDidMount() {
    AppState.addEventListener('change', this.handleAppStateChange);
    const { menu } = this.props;
    if (menu && menu.data) {
      this.loadResult(menu.data.id);
    }
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    const currentMenu = this.props.menu;
    const nextMenu = nextProps.menu;
    if (nextMenu !== currentMenu) {
      this.setState({
        menuList: this._configMenuList(nextMenu)
      });
      if (nextMenu && nextMenu.data.id) {
        this.loadResult(nextMenu.data.id);
      }
    }
  }

  UNSAFE_componentWillUnmount() {
    AppState.removeEventListener('change', this.handleAppStateChange);
    this.unmounted = true;
  }

  onRefresh() {
    const { menu } = this.props;
    if (menu && menu.data) {
      this.loadResult(menu.data.id, this.state.date);
    }
  }

  onCalendar(date) {
    this.setState({
      date
    });
    const { menu } = this.props;
    if (menu && menu.data) {
      this.loadResult(menu.data.id, date);
    }
  }

  handleAppStateChange = (nextAppState) => {
    if (nextAppState === 'active') {
      this.onRefresh();
    }
  }

  _configMenuList(menu) {
    if (menu && menu.childNodes) {
      return [...menu.childNodes];
    }
    return [];
  }

  _keyExtractor(item, index) {
    return `${index}`;
  }

  refresh() {
    if (!this.state.loading) {
      this.setState({
        menuList: this._configMenuList(this.props.menu)
      });
    }
  }

  async loadResult(company_id, date = null) {
    this.setState({
      loading: true
    });
    const search = {
      company_id
    };
    if (date) {
      search.date = moment(date).format('DD-MM-YYYY');
    }
    const result = await Api.getCompanyResult(search);
    if (!this.unmounted) {
      this.setState({
        loading: false,
        result
      });
    }
  }

  renderMenuItem({ item }) {
    let data = null;
    if (this.state.result !== null) {
      const { result } = this.state;
      for (let i = 0, ni = result.length; i < ni; i++) {
        const resultItem = result[i];
        if (resultItem.game_id === item.data.id) {
          data = resultItem;
        }
      }
    }
    return (
      <View>
        <MenuItem
          menu={item}
          onPress={this.props.onMenuPress}
        />
        {
          data ? (
            <View>
              <ScoreCard type="company" data={data} mode={item.data.mode} />
            </View>
          ) : null
        }
      </View>
    );
  }

  render() {
    const { menu } = this.props;
    const { loading, menuList } = this.state;
    return (
      <ScrollView
        style={Styles.container}
        refreshControl={
          <RefreshControl refreshing={loading} onRefresh={this.onRefresh.bind(this)} />
        }
      >
        {/* Breed Crumb */}
        <BreedCrumb
          menu={menu}
          onPress={this.props.onMenuBackPress}
          onCalendarPress={this.onCalendar.bind(this)}
          onRefreshPress={this.onRefresh.bind(this)}
        />
        {/* Main Menus */}
        {
          (menuList && menuList.length > 0) ? (
            !loading && (
              <FlatList
                data={menuList}
                keyExtractor={this._keyExtractor.bind(this)}
                renderItem={this.renderMenuItem.bind(this)}
              />
            )
          ) : null
        }
        <View style={Styles.sectionContainer}>
          {/* Html Section */}
          {
            menu.description ? (
              <View style={Styles.section}>
                {CommonWidget.renderHtml(menu.description)}
              </View>
            ) : null
          }
        </View>
      </ScrollView>
    );
  }
}

export default CompanyScreen;
