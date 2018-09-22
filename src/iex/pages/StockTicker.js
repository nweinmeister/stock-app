import React, { Component } from 'react';
import openSocket from 'socket.io-client';

import { StockFetch } from '../resources/StockFetch';
import { StockChart } from '../resources/StockChart';
import { StockIcon } from '../resources/StockIcon';
import { StockSocket } from '../resources/StockSocket';

class StockTicker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPrice: null,
      lastUpdated: null,
      data: null,
      logoUrl: null,
      symbol: props.match.params.symbol
    }
  }
  componentDidMount() {
    const socket = new StockSocket((data) => this.setState({currentPrice: data.bidPrice == 0 ? data.lastSalePrice : data.bidPrice, lastUpdated: new Date(data.lastUpdated).toTimeString()}), this.state.symbol)
    StockChart((response) => this.setState({data: response}), this.state.symbol);
    StockIcon((response) => this.setState({logoUrl: response.url}), this.state.symbol);
  }
  renderData = () => {
    console.log(this.state.data)
  }
  renderLogo = () => {
    return(
      <img src={this.state.logoUrl} />
    )
  }
  render() {
    return(
      <div>
        <h3>Price: {this.state.currentPrice}</h3>
        <h5>Last Updated: {this.state.lastUpdated}</h5>
        {this.state.logoUrl && this.renderLogo()}
        {this.state.data && this.renderData()}
      </div>
    )
  }
}

export { StockTicker };