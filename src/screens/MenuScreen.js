import React, { Component } from 'react';
import { FlatList, View, ScrollView } from 'react-native';

import { Styles } from '../theme';
import BreedCrumb from '../components/custom/BreedCrumb';
import MenuItem from '../components/custom/MenuItem';
import CommonWidget from '../components/custom/CommonWidget';

class MenuScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      menuList: this._configMenuList()
    };
  }

  _configMenuList() {
    const { menu } = this.props;
    if (menu && menu.childNodes) {
      return [...menu.childNodes];
    }
    return [];
  }

  _keyExtractor(item, index) {
    return `${index}`;
  }

  refresh() {
    this.setState({
      menuList: this._configMenuList()
    });
  }

  renderMenuItem({ item }) {
    return (
      <MenuItem
        menu={item}
        onPress={this.props.onMenuPress}
      />
    );
  }

  render() {
    const { menu } = this.props;
    const { menuList } = this.state;
    return (
      <ScrollView style={Styles.container}>
        <BreedCrumb menu={menu} onPress={this.props.onMenuBackPress} />
        {
          (menuList && menuList.length > 0) ? (
            <FlatList
              data={menuList}
              keyExtractor={this._keyExtractor.bind(this)}
              renderItem={this.renderMenuItem.bind(this)}
            />
          ) : null
        }
        {
          menu.description ? (
            <View style={Styles.sectionContainer}>
              <View style={Styles.section}>
                {CommonWidget.renderHtml(menu.description)}
              </View>
            </View>
          ) : null
        }
      </ScrollView>
    );
  }
}

export default MenuScreen;
