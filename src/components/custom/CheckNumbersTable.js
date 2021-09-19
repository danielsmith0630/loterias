import React, { Component } from 'react';
import { SectionList, Text, View } from 'react-native';
import I18n from 'react-native-i18n';

import { Styles } from '../../theme';
import CommonWidget from './CommonWidget';


const styles = {
  tableCellHits: {
    flex: 2
  },
  tableCellDate: {
    flex: 3
  },
  tableCellDraw: {
    flex: 3
  },
  tableCellResult: {
    flex: 4
  }
};

class CheckNumbersTable extends Component {
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
        <View style={[Styles.tableHeaderCell, styles.tableCellHits]}>
          <Text style={Styles.tableHeaderCellText}>{I18n.t('hits')}</Text>
        </View>
        <View style={[Styles.tableHeaderCell, styles.tableCellDate]}>
          <Text style={Styles.tableHeaderCellText}>{I18n.t('date')}</Text>
        </View>
        <View style={[Styles.tableHeaderCell, styles.tableCellDraw]}>
          <Text style={Styles.tableHeaderCellText}>{I18n.t('draw')}</Text>
        </View>
        <View style={[Styles.tableHeaderCell, styles.tableCellResult]}>
          <Text style={Styles.tableHeaderCellText}>{I18n.t('result')}</Text>
        </View>
      </View>
    );
  }

  renderItem({ item }) {
    return (
      <View style={Styles.tableItem}>
        <View style={[Styles.tableItemCell, styles.tableCellHits]}>
          <Text style={[Styles.tableItemCellText, Styles.textCenter]}>{item.matches}</Text>
        </View>
        <View style={[Styles.tableItemCell, styles.tableCellDate]}>
          <Text style={[Styles.tableItemCellText, Styles.textCenter]}>{item.date}</Text>
        </View>
        <View style={[Styles.tableItemCell, styles.tableCellDraw]}>
          <Text style={[Styles.tableItemCellText, Styles.textCenter]}>{item.game_title}</Text>
        </View>
        <View style={[Styles.tableItemCell, styles.tableCellResult]}>
          {CommonWidget.renderCircleNumbers(item.score, 1)}
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

export default CheckNumbersTable;
