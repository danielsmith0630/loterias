import React, { Component } from 'react';
import { SectionList, Text, View } from 'react-native';
import I18n from 'react-native-i18n';

import { Styles } from '../../theme';
import CommonWidget from './CommonWidget';

const styles = {
  tableCellRank: {
    flex: 2
  },
  tableCellResult: {
    flex: 3,
    alignItems: 'center'
  },
  tableCellQuantity: {
    flex: 3
  },
  tableCellPosition: {
    flex: 4
  }
};

class NumbersTable extends Component {
  constructor(props) {
    super(props);
    const { data } = this.props;
    this.state = {
      sections: this.getSections(data)
    };
  }

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

  renderSectionHeader() {
    return (
      <View style={Styles.tableHeader}>
        <View style={[Styles.tableHeaderCell, styles.tableCellRank]}>
          <Text style={Styles.tableHeaderCellText}>{I18n.t('rank')}</Text>
        </View>
        <View style={[Styles.tableHeaderCell, styles.tableCellResult]}>
          <Text style={Styles.tableHeaderCellText}>{I18n.t('result')}</Text>
        </View>
        <View style={[Styles.tableHeaderCell, styles.tableCellQuantity]}>
          <Text style={Styles.tableHeaderCellText}>{I18n.t('quantity')}</Text>
        </View>
        <View style={[Styles.tableHeaderCell, styles.tableCellPosition]}>
          <Text style={Styles.tableHeaderCellText}>{I18n.t('position')}</Text>
        </View>
      </View>
    );
  }

  renderItem({ item }) {
    return (
      <View style={Styles.tableItem}>
        <View style={[Styles.tableItemCell, styles.tableCellRank]}>
          <Text style={[Styles.tableItemCellText, Styles.textCenter]}>{item.rank}</Text>
        </View>
        <View style={[Styles.tableItemCell, styles.tableCellResult]}>
          {CommonWidget.renderCircleNumber(item.score, 1)}
        </View>
        <View style={[Styles.tableItemCell, styles.tableCellQuantity]}>
          <Text style={[Styles.tableItemCellText, Styles.textCenter]}>{item.total_count}</Text>
        </View>
        <View style={[Styles.tableItemCell, styles.tableCellPosition]}>
          <Text style={[Styles.tableItemCellText, Styles.textCenter]}>
            {item.positional_count ? item.positional_count.join(', ') : ''}
          </Text>
        </View>
      </View>
    );
  }

  render() {
    return (
      <SectionList
        sections={this.state.sections}
        keyExtractor={this.keyExtractor.bind(this)}
        renderSectionHeader={this.renderSectionHeader.bind(this)}
        renderItem={this.renderItem.bind(this)} />
    );
  }
}

export default NumbersTable;
