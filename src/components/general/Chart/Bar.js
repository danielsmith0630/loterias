import React, { Component } from 'react';
import { Text as ReactText, View } from 'react-native';
import { BarChart, XAxis, YAxis, Grid } from 'react-native-svg-charts';

export default class Bar extends Component {
    
  render() {
    const data = [];
    const xAxes = [];

    var max = 0;

    const noDataMsg = this.props.noDataMessage || 'No data available';

    if (this.props.data === undefined) {
      return (<ReactText>{noDataMsg}</ReactText>);
    } else {
      var i = 0;
      for (var key in this.props.data) {
        if (i % 8 == 0) {
          xAxes.push(i);
        }

        if (max < this.props.data[key][0].v) {
          max = this.props.data[key][0].v;
        }

        data.push(this.props.data[key][0].v);

        i++;
      }
    }

    const axesSvg = { fontSize: 10, fill: 'black' };

    return (
      <View style = {{height: 150, padding:0, flexDirection: 'row'}}>
        <YAxis
          data = {data}
          style = {{marginBottom: 20}}
          numberOfTicks={max > 6 ? 6 : max}
          contentInset = {{ top: 10, bottom: 10 }}
          svg = {axesSvg}
        />

        <View style = {{flex: 1, marginLeft: 10}}>
          <BarChart
            style = {{flex: 1}}
            data = {data}
            svg = {{fill: '#2980B9'}}
            contentInset = {{top: 10, bottom: 10}}
          >
            <Grid />
          </BarChart>
          <XAxis
            style={{ marginHorizontal: 0, marginTop: 5 }}
            data={xAxes}
            formatLabel={(index) => xAxes[index]}
            contentInset={{ left: 10, right: 10 }}
            svg = {axesSvg}
          />
        </View>
      </View>
    );
  }
}
