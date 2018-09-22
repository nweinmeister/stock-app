import React, { Component } from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend, CartesianGrid } from 'recharts';
import { TextField, Button, Card, CardContent } from '@material-ui/core';

const mainContainerStyle = {
  textAlign: "center"
}

class StockPredictor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      prediction: "Loading...",
      predictionData: null,
      endDate: '2018-09-07',
      previousDays: 5,
      trainingDays: 5
    }
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  fetchStockPredictions = () => {
    this.setState({predictionData: null, prediction: 'Loading...'})
    fetch(`http://localhost:5000/stock-predictor/evaluate/${this.props.match.params.symbol}/${this.state.endDate}/${this.state.previousDays}/${this.state.trainingDays}`)
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({predictionData: responseJson.data, prediction: this.props.match.params.symbol})
    })
  }

  componentDidMount() {
    this.fetchStockPredictions();
  }

  renderEvaluationChart = () => this.state.predictionData && (
    <LineChart title={this.props.match.params.symbol} width={600} height={300} data={this.state.predictionData}>
      <XAxis dataKey="date"/>
      <YAxis/>
      <CartesianGrid strokeDasharray="3 3"/>
      <Tooltip/>
      <Legend />
      <Line type="monotone" dataKey="prediction" stroke="#8884d8" activeDot={{r: 8}}/>
      <Line type="monotone" dataKey="actual" stroke="#82ca9d" activeDot={{r: 8}}/>
    </LineChart>
  )

  render() {
    return(
      <div style={mainContainerStyle}>
        <h1>{this.state.prediction}</h1>
        {this.renderEvaluationChart()}
        <Card>
          <CardContent>
          <TextField
            id="endDate"
            label="End Date"
            type="date"
            InputLabelProps={{
              shrink: true,
            }}
            value={this.state.endDate}
            onChange={this.handleChange('endDate')}
            margin="normal"
          />
          <TextField
            id="previousDays"
            label="Previous Days"
            type="number"
            InputLabelProps={{
              shrink: true,
            }}
            value={this.state.previousDays}
            onChange={this.handleChange('previousDays')}
            margin="normal"
          />
          <TextField
            id="trainingDays"
            label="Training Days"
            type="number"
            InputLabelProps={{
              shrink: true,
            }}
            value={this.state.trainingDays}
            onChange={this.handleChange('trainingDays')}
            margin="normal"
          />
          <Button onClick={this.fetchStockPredictions}>
            Update
          </Button>
          </CardContent>
        </Card>
      </div>
    )
  }
}

export {StockPredictor};