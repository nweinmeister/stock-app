import React, { Component } from 'react';

import {StockGraph} from '../components/StockGraph';
import {StockDataMapper} from '../helpers/StockDataMapper';
import { TextField, Button, Card, CardContent } from '../../node_modules/@material-ui/core';

const mainContainerStyle = {
  textAlign: "center"
}

class Test extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stockSymbol: null,
      startDate: null,
      endDate: null,
      stockData: null
    }
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  handleSubmit = () => {
    this.fetchStockData(this.state.stockSymbol, this.state.startDate, this.state.endDate);
  }

  fetchStockData = (stock_symbol, startDate, endDate) => {
    fetch(`http://localhost:5000/${stock_symbol}/${startDate}/${endDate}`).then((response) => response.json())
                                   .then((responseJson) => {
                                     console.log(responseJson)
                                     this.setState({stockData: responseJson.data})
                                   })
  }

  renderStockData = () => {
    return this.state.stockData && (
      <StockGraph stockSymbol={this.state.stockSymbol} graphableStockData={StockDataMapper(this.state.stockData)} />
    )
  }

  render() {
    return(
      
      <div style={mainContainerStyle}>
        <Card>
          <CardContent>
            <TextField
              id="stockSymbol"
              label="Symbol"
              value={this.state.name}
              onChange={this.handleChange('stockSymbol')}
              margin="normal"
            />
            <br></br>
            <TextField
              id="startDate"
              label="Start Date"
              type="date"
              InputLabelProps={{
                shrink: true,
              }}
              value={this.state.startDate}
              onChange={this.handleChange('startDate')}
              margin="normal"
            />
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
            <br></br>
            <Button color="primary" type="button" onClick={this.handleSubmit}>
              Search
            </Button>
            {this.renderStockData()}
          </CardContent>
        </Card>
      </div>
      
    )
  }
}

export {Test};