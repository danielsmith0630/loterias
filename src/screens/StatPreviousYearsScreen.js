import React, { Component } from 'react';
import { ScrollView } from 'react-native';

import Api from '../apis';
import { Styles } from '../theme';
import AppHelper from '../helpers/AppHelper';
import BreedCrumb from '../components/custom/BreedCrumb';
import PreviousYearsTable from '../components/custom/PreviousYearsTable';
import CommonWidget from '../components/custom/CommonWidget';

class StatPreviousYearsScreen extends Component {
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

    const result = await Api.getStatResult('wayback');
    if (!this.unmounted) {
      this.setState({
        result: result ? AppHelper.convertWaybackData(result) : null,
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
            result ? <PreviousYearsTable data={result} /> : null
          )
        }
      </ScrollView>
    );
  }
}

export default StatPreviousYearsScreen;
