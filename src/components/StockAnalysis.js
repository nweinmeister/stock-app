import React, { Component } from 'react';
import {TextField, Button} from '@material-ui/core';
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend, CartesianGrid } from 'recharts';
import { StockDataCard } from './StockDataCard';
import { getToday } from '../helpers/DateHelper';

class StockAnalysis extends Component {
  constructor() {
    super()
    this.state = {
      date: '2018-09-12',
      data: null
    }
  }

  componentDidMount() {
    fetch(`http://localhost:5000/stock-analysis/${this.props.symbol}/${this.state.date}`)
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({data: responseJson})
    })
  }

  renderAnalysisGraph = () => this.state.data && (
    <LineChart title={this.props.symbol} width={600} height={300} data={this.state.data}>
      <XAxis dataKey="date"/>
      <YAxis/>
      <CartesianGrid strokeDasharray="3 3"/>
      <Tooltip/>
      <Legend />
      <Line type="monotone" dataKey="high" stroke="#8884d8" activeDot={{r: 8}}/>
      <Line type="monotone" dataKey="volume" stroke="#82ca9d" activeDot={{r: 8}}/>
    </LineChart>
  )

  render() {
    return(
      <div>
        {this.renderAnalysisGraph()}
      </div>
    )
  }
}

export { StockAnalysis }