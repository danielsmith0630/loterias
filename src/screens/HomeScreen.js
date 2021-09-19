import React, { Component } from 'react';
import { FlatList, View, ScrollView } from 'react-native';

import { Styles } from '../theme';
import MenuItem from '../components/custom/MenuItem';
import CommonWidget from '../components/custom/CommonWidget';

class HomeScreen extends Component {
  constructor(props) {
    super(props);
    const { menu } = this.props;
    this.state = {
      menuList: menu && menu.childNodes ? this._configMenuList([], menu.childNodes) : []
    };
  }

  _configMenuList(list, nodes) {
    if (nodes && nodes.length > 0) {
      for (let i = 0, ni = nodes.length; i < ni; i++) {
        const node = nodes[i];
        list.push(node);
        if (node.collapsable && node.childNodes && node.childNodes.length && node.depth < 2) {
          this._configMenuList(list, node.childNodes);
        }
      }
    }
    return list;
  }

  _keyExtractor(item, index) {
    return `${index}`;
  }

  refresh() {
    const { menu } = this.props;
    this.setState({
      menuList: menu && menu.childNodes ? this._configMenuList([], menu.childNodes) : []
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
    return (
      <ScrollView style={Styles.container}>
        <View>
          <FlatList
            data={this.state.menuList}
            keyExtractor={this._keyExtractor.bind(this)}
            renderItem={this.renderMenuItem.bind(this)}
          />
        </View>
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

export default HomeScreen;
