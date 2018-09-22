import React, { Component } from 'react';
import {Card, CardContent, Button} from '@material-ui/core';
import {BarChart, Bar, XAxis, YAxis, Tooltip, Legend, CartesianGrid} from 'recharts';
import {DateRange} from '../components/DateRange';
import {StockPredictor} from '../components/StockPredictor';
import { StockPredictorEvaluation } from '../components/StockPredictorEvaluation';
import { getToday } from '../helpers/DateHelper';
import { StockAnalysis } from '../components/StockAnalysis';

const mainContainerStyle = {
  textAlign: "center"
}

class PercentGains extends Component {
  constructor(props) {
    super(props);
    this.state = {
      percentGains: null,
      startDate: '2018-08-20',
      endDate: getToday()
    }
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  handleBack = () => {
    this.props.history.push('/wins');
  }

  fetchStockData = () => {
    fetch(`http://localhost:5000/start-to-win/${this.props.match.params.symbol}/${this.state.startDate}/${this.state.endDate}`)
                                        .then((response) => response.json())
                                        .then((responseJson) => {
                                          this.setState({
                                            percentGains: responseJson.data
                                          })
                                        })
  }

  componentDidMount() {
    this.fetchStockData();
  }

  renderPercentGains = () => (
    this.state.percentGains &&
      <BarChart width={730} height={250} data={this.state.percentGains}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="bin" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="count" fill="#8884d8" />
      </BarChart>
  )

  render() {
    return(
      <div style={mainContainerStyle}>
        <h1>{this.props.match.params.symbol.toUpperCase()}</h1>
        <Card>
          <CardContent>
            {this.renderPercentGains()}
            <i>This histogram shows the number of days that the stock peaked in each percentage from the opening price.</i>
            <DateRange handleChange={this.handleChange} startDate={this.state.startDate} endDate={this.state.endDate} />
            <Button onClick={this.fetchStockData}>Update</Button>
          </CardContent>
        </Card>
        <Card>
          <StockPredictor symbol={this.props.match.params.symbol}/>
          <StockPredictorEvaluation symbol={this.props.match.params.symbol} />
          <StockAnalysis symbol={this.props.match.params.symbol} />
        </Card>
        <Button color="secondary" onClick={this.handleBack}>Back to List</Button>
      </div>
    )
  }
}

export {PercentGains};