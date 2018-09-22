import React, { Component } from 'react';
import {TextField, Button} from '@material-ui/core';
import { StockDataCard } from './StockDataCard';
import { getToday } from '../helpers/DateHelper';

const mainContainerStyle = {
  textAlign: "center",
  paddingTop: "15px"
}

class StockPredictor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      prediction: "Loading...",
      current: false,
      previousDay: getToday(),
      trainingDays: 5
    }
  }

  componentDidMount() {
    this.fetchPrediction();
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  fetchPrediction = () => {
    this.setState({prediction: 'Loading...'})
    fetch(`http://localhost:5000/stock-predictor/${this.props.symbol}/${this.state.previousDay}/${this.state.trainingDays}`)
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({prediction: '$' + responseJson.data.prediction.toString().substring(0, 6), current: responseJson.data.current})
    })
  }

  render() {
    return(
      <div style={mainContainerStyle}>
        <i>This is the prediction for the day high for the day after the chosen date.</i>
        <h1>Prediction: {this.state.prediction}</h1>
        <h3><StockDataCard date={this.state.previousDay} symbol={this.props.symbol} stockData={this.state.current}/></h3>
        <div className="form-group">
          <TextField
            id="previousDay"
            label="Previous Day"
            type="date"
            InputLabelProps={{
              shrink: true,
            }}
            value={this.state.previousDay}
            onChange={this.handleChange('previousDay')}
            margin="normal"
          />
        </div>
        <div className="form-group">
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
          </div>
        <Button onClick={this.fetchPrediction}>Update</Button>
      </div>
    )
  }
}

export {StockPredictor};