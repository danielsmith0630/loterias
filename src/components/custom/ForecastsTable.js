import React, { Component } from 'react';
import { SectionList, Text, View } from 'react-native';
import I18n from 'react-native-i18n';

import { Styles } from '../../theme';
import CommonWidget from './CommonWidget';


const styles = {
  tableCellCenter: {
    flex: 1,
    alignItems: 'center'
  }
};

class ForecastsTable extends Component {
  UNSAFE_componentWillReceiveProps(nextProps) {
    if (this.props.data !== nextProps.data) {
      const { data } = nextProps;
      this.setState({
        sections: this.getSections(data)
      });
    }
  }

  getSections() {
    return ([
      { data: (this.props.data || []) }
    ]);
  }

  keyExtractor(item, index) {
    return `${index}`;
  }

  renderHeader(text) {
    return (
      <View style={Styles.tableHeader}>
        <View style={[Styles.tableHeaderCell, styles.tableCellCenter]}>
          <Text style={Styles.tableHeaderCellText}>{I18n.t(text)}</Text>
        </View>
      </View>
    );
  }

  renderItem(item) {
    return (
      <View style={Styles.tableItem}>
        <View style={[Styles.tableItemCell, styles.tableCellCenter]}>
          {CommonWidget.renderCircleNumbers(item, 1)}
        </View>
      </View>
    );
  }

  render() {
    const { hot, cold } = this.props.data;
    return (
      <View>
        {this.renderHeader('hot_numbers')}
        {this.renderItem(hot)}
        {this.renderHeader('cold_numbers')}
        {this.renderItem(cold)}
      </View>
    );
  }
}

export default ForecastsTable;
