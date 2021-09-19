import React, { Component } from 'react';
import { ScrollView } from 'react-native';

import Api from '../apis';
import { Styles } from '../theme';

import BreedCrumb from '../components/custom/BreedCrumb';
import NumbersTable from '../components/custom/NumbersTable';
import CommonWidget from '../components/custom/CommonWidget';

class StatColdNumbersScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      result: null
    };
    this.unmounted = false;
  }

  componentDidMount() {
    this.initialize();
  }

  UNSAFE_componentWillUnmount() {
    this.unmounted = true;
  }

  async initialize() {
    this.setState({
      loading: true
    });

    const result = await Api.getStatResult('cold');
    if (!this.unmounted) {
      this.setState({
        result,
        loading: false
      });
    }
  }

  render() {
    const { menu } = this.props;
    const { loading, result } = this.state;

    return (
      <ScrollView style={Styles.container}>
        {/* Breed Crumb */}
        <BreedCrumb
          menu={menu}
          onPress={this.props.onMenuBackPress}
        />
        {
          loading ? CommonWidget.renderSecondaryActivityIndicator() : (
            result ? <NumbersTable data={result} /> : null
          )
        }
      </ScrollView>
    );
  }
}

export default StatColdNumbersScreen;
