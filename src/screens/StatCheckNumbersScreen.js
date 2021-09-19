import React, { Component } from 'react';
import {
  ScrollView, TextInput, TouchableOpacity, View
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import Api from '../apis';
import {
  Colors, Fonts, Metrics, Styles
} from '../theme';

import BreedCrumb from '../components/custom/BreedCrumb';
import CheckNumbersTable from '../components/custom/CheckNumbersTable';
import CommonWidget from '../components/custom/CommonWidget';


const styles = {
  searchForm: {
    padding: Metrics.paddingDefault,
    flexDirection: 'row',
    justifyContent: 'center'
  },
  inputTextDigit: {
    height: Metrics.formElementHeight,
    width: Metrics.formElementHeight * 1.2,
    backgroundColor: Colors.inputTextBackground,
    color: Colors.inputText,
    borderColor: Colors.inputTextBorder,
    borderWidth: 1,
    fontSize: Fonts.size.h4,
    marginRight: Metrics.marginDefault,
    textAlign: 'center',
    paddingHorizontal: Metrics.paddingDefault,
    paddingVertical: 0
  },
  searchButton: {
    height: Metrics.formElementHeight,
    width: Metrics.formElementHeight,
    alignItems: 'center',
    justifyContent: 'center'
  },
  searchButtonIconDisabled: {
    color: Colors.inputTextDisabled
  },
  searchButtonIcon: {
    color: Colors.inputText,
    fontSize: Fonts.size.h4
  }
};

class StatCheckNumbersScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      first: '',
      second: '',
      third: '',
      result: null
    };
    this.unmounted = false;
  }

  UNSAFE_componentWillUnmount() {
    this.unmounted = true;
  }

  async onSearch() {
    this.firstInput.blur();
    this.secondInput.blur();
    this.thirdInput.blur();

    this.setState({
      loading: true
    });
    let query = (this.state.first ? `score[]=${this.state.first}` : '');
    query += (this.state.second ? `&score[]=${this.state.second}` : '');
    query += (this.state.third ? `&score[]=${this.state.third}` : '');

    const result = await Api.getSearch(query);
    if (!this.unmounted) {
      this.setState({
        result,
        loading: false
      });
    }
  }

  render() {
    const searchable = (this.state.first);
    const { menu } = this.props;
    const { loading, result } = this.state;

    return (
      <ScrollView style={Styles.container}>
        {/* Breed Crumb */}
        <BreedCrumb
          menu={menu}
          onPress={this.props.onMenuBackPress}
        />
        {/* Search Form */}
        <View style={styles.searchForm}>
          <TextInput
            ref={(ref) => { this.firstInput = ref; }}
            underlineColorAndroid={Colors.transparent}
            style={styles.inputTextDigit}
            value={this.state.first}
            keyboardType="numeric"
            returnKeyType="next"
            clearTextOnFocus={false}
            autoCorrect={false}
            autoFocus
            maxLength={2}
            enablesReturnKeyAutomatically
            blurOnSubmit
            onChangeText={(text) => {
              if (text.length >= 2) {
                this.setState({ first: text.substring(text.length - 2, text.length) });
                this.secondInput.focus();
              } else {
                this.setState({ first: text });
              }
            }}
            onSubmitEditing={() => this.secondInput.focus()} />
          <TextInput
            ref={(ref) => { this.secondInput = ref; }}
            underlineColorAndroid={Colors.transparent}
            style={styles.inputTextDigit}
            value={this.state.second}
            keyboardType="numeric"
            returnKeyType="next"
            clearTextOnFocus={false}
            autoCorrect={false}
            maxLength={2}
            enablesReturnKeyAutomatically
            blurOnSubmit
            onChangeText={(text) => {
              if (text.length === 0) {
                this.setState({ second: '' });
                this.firstInput.focus();
              } else if (text.length >= 2) {
                this.setState({ second: text.substring(text.length - 2, text.length) });
                this.thirdInput.focus();
              } else {
                this.setState({ second: text });
              }
            }}
            onSubmitEditing={() => this.thirdInput.focus()} />
          <TextInput
            ref={(ref) => { this.thirdInput = ref; }}
            underlineColorAndroid={Colors.transparent}
            style={styles.inputTextDigit}
            value={this.state.third}
            keyboardType="numeric"
            returnKeyType="search"
            clearTextOnFocus={false}
            autoCorrect={false}
            maxLength={2}
            enablesReturnKeyAutomatically
            blurOnSubmit
            onChangeText={(text) => {
              if (text.length === 0) {
                this.setState({ third: '' });
                this.secondInput.focus();
              } else if (text && text.length >= 2) {
                this.setState({ third: text.substring(text.length - 2, text.length) });
              } else {
                this.setState({ third: text });
              }
            }}
            onSubmitEditing={this.onSearch.bind(this)} />
          <TouchableOpacity onPress={this.onSearch.bind(this)} style={[styles.searchButton]} disabled={!searchable}>
            <Icon name="search" style={[styles.searchButtonIcon, !searchable ? styles.searchButtonIconDisabled : null]} />
          </TouchableOpacity>
        </View>
        {
          loading ? CommonWidget.renderSecondaryActivityIndicator() : (
            result ? <CheckNumbersTable data={result} /> : null
          )
        }
      </ScrollView>
    );
  }
}

export default StatCheckNumbersScreen;
