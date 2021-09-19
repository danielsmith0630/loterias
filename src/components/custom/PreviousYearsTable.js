
import React, { Component } from 'react';
import { Image, View, Text } from 'react-native';

import Accordion from 'react-native-collapsible/Accordion';
import Icon from 'react-native-vector-icons/FontAwesome';

import {
  Colors, Fonts, Metrics, Styles
} from '../../theme';
import CommonWidget from './CommonWidget';

const styles = {
  header: {
    backgroundColor: Colors.tableHeaderBackground,
    borderBottomWidth: 1,
    borderColor: Colors.tableHeaderBorder,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: Metrics.paddingDefault,
    paddingHorizontal: Metrics.paddingDefault
  },
  headerTitle: {
    color: Colors.tableHeaderText,
    fontSize: Fonts.size.default
  },
  headerIcon: {
    color: Colors.tableHeaderText,
    fontSize: Fonts.size.default
  },
  image: {
    width: Metrics.iconDefault,
    height: Metrics.iconDefault
  },
  tableCellImage: {
    // flex: 2,
  },
  tableCellTitle: {
    // flex: 3,
  },
  tableCellDate: {
    // flex: 4,
  },
  tableCellNumbers: {
    // flex: 4,
  }
};

class PreviousYearsTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeSections: [0]
    };
  }

  onChange(index) {
    this.setState({
      activeSections: index
    });
  }

  renderHeader(section, index, isActive) {
    return (
      <View style={styles.header}>
        <Text style={styles.headerTitle}>{section.title}</Text>
        <Icon
          style={styles.headerIcon}
          name={isActive ? 'angle-up' : 'angle-down'}
        />
      </View>
    );
  }

  renderContent(section, index) {
    return (
      <View key={index}>
        {
          section.content.map((item, subIndex) => (
            <View style={Styles.tableItem} key={subIndex}>
              {/* <View style={[Styles.tableItemCell, styles.tableCellImage]}>
                <Image source={{ uri: item.game_logo }} style={styles.image} resize="cover" />
              </View> */}
              <View style={[Styles.tableItemCell, styles.tableCellTitle]}>
                <Text style={[Styles.tableItemCellText]}>{item.game_title}</Text>
              </View>
              <View style={[Styles.tableItemCell, styles.tableCellDate]}>
                <Text style={[Styles.tableItemCellText]}>{item.date}</Text>
              </View>
              <View style={[Styles.tableItemCell, styles.tableCellNumbers]}>
                {CommonWidget.renderCircleNumbers(item.score)}
              </View>
            </View>
          ))
        }
      </View>
    );
  }

  render() {
    return (
      <Accordion
        sections={this.props.data}
        activeSections={this.state.activeSections}
        renderHeader={this.renderHeader.bind(this)}
        renderContent={this.renderContent.bind(this)}
        onChange={this.onChange.bind(this)}
      />
    );
  }
}

export default PreviousYearsTable;
