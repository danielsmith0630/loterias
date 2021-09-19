import React, { Component, Fragment } from 'react';
import { AppState, ScrollView, View, RefreshControl } from 'react-native';
import moment from 'moment';

import Api from '../apis';
import AppHelper from '../helpers/AppHelper';
import { Styles } from '../theme';
import BreedCrumb from '../components/custom/BreedCrumb';
import ScoreCard from '../components/custom/ScoreCard';
import CommonWidget from '../components/custom/CommonWidget';

class GameScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      date: null,
      result: null
    };
    this.unmounted = false;
  }

  componentDidMount() {
    AppState.addEventListener('change', this.handleAppStateChange);
    this.onCalendar(null);
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    const currentMenu = this.props.menu;
    const nextMenu = nextProps.menu;
    if (nextMenu !== currentMenu) {
      this.loadResult(nextMenu.data.id);
    }
  }

  UNSAFE_componentWillUnmount() {
    AppState.removeEventListener('change', this.handleAppStateChange);
    this.unmounted = true;
  }

  onRefresh() {
    this.loadResult(this.props.menu.data.id, this.state.date);
  }

  onCalendar(date) {
    this.setState({
      date
    });
    this.loadResult(this.props.menu.data.id, date);
  }

  handleAppStateChange = (nextAppState) => {
    if (nextAppState === 'active') {
      this.onRefresh();
    }
  }

  _keyExtractor(item, index) {
    return `${index}`;
  }

  async loadResult(game_id, date) {
    this.setState({
      loading: true
    });
    const params = {
      game_id,
      multiple: 1
    };
    if (date) {
      params.date = moment(date).format('DD-MM-YYYY');
    }
    const result = await Api.getGameResult(params);
    if (!this.unmounted) {
      this.setState({
        loading: false,
        result
      });
    }
  }

  render() {
    const { menu } = this.props;
    const { loading, result } = this.state;

    let d = new Date();
    let utc = d.getTime();
    let date = new Date(utc - (3600000 * 4));
    let today = moment(date).format('DD-MM-YYYY');

    let delayData = [];
    if (result && result.delay) {
      delayData = {
        'delay': true,
        'delay_reason': result.delay_reason,
        'date': today
      }
    }

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
        {/* ScoreCard */}
        {
          !loading && (
            result && result.sessions ? (
              result.delay && result.sessions[0].date != today ? (
                <Fragment>
                  <ScoreCard type="game" mode={menu.data.mode} data={delayData} />
                  {
                    result.sessions.map((item, index) => (
                      index < result.sessions.length - 1 && (
                        <ScoreCard key={index} type="game" mode={menu.data.mode} data={item} />
                      )
                    ))
                  }
                </Fragment>
              ) : (
                result.sessions.map((item, index) => (
                  <ScoreCard key={index} type="game" mode={menu.data.mode} data={item} />
                ))
              )
              
            ) : null
          )
        }
        <View style={Styles.sectionContainer}>
          {/* BarChart */}
          {
            (!loading && result && result.stats) ? (
              CommonWidget.renderChart(AppHelper.convertChartData(result.stats))
            ) : null
          }
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

export default GameScreen;