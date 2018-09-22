import React, { Component } from 'react';
import { Button, Card, CardContent, CardHeader, TextField, List, ListItem, Divider } from '../../node_modules/@material-ui/core';
import { DateRange } from '../components/DateRange';
import { getToday } from '../helpers/DateHelper';

const mainContainerStyle = {
  textAlign: "center"
}

class Wins extends Component {
  constructor(props) {
    super(props);
    this.state = {
      wins: null,
      startDate: '2018-08-27',
      endDate: getToday(),
      newSymbol: ''
    }
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  fetchStockData = () => {
    fetch(`http://localhost:5000/start-to-wins/${this.state.startDate}/${this.state.endDate}`)
                                        .then((response) => response.json())
                                        .then((responseJson) => {
                                          this.setState({
                                            wins: responseJson.data
                                          })
                                        })
  }

  addSymbol = () => {
    fetch(`http://localhost:5000/add-symbol/${this.state.newSymbol}`)
                                        .then((response) => response.json())
                                        .then((responseJson) => {
                                          console.log(responseJson.data)
                                          this.fetchStockData()
                                        })
  }

  removeSymbol = () => {
    fetch(`http://localhost:5000/remove-symbol/${this.state.newSymbol}`)
                                        .then((response) => response.json())
                                        .then((responseJson) => {
                                          console.log(responseJson.data)
                                          this.fetchStockData()
                                        })
  }

  componentDidMount() {
    this.fetchStockData();
  }

  handleSelect = (symbol) => {
    this.props.history.push(`/percent-gains/${symbol}`)
  }

  renderWins = () => (
    <List className="wins-list">
      {this.state.wins && this.state.wins.map((win) => {
        return(
          <div key={win.symbol}>
            <ListItem button className="win-item" onClick={() => this.handleSelect(win.symbol)}>
              <div className="win-item"><b>{win.symbol.toUpperCase()}</b> - {(win.win_percentage * 100).toString().substring(0, 5)}%</div>
            </ListItem>
            <Divider />
          </div>
        )
      })}
    </List>
  )

  render() {
    return(
      <div style={mainContainerStyle}>
        <Card className="main-card">
          <CardContent>
            <h1>Wins Listings</h1>
            <i>
              This list contains stocks and the percentage of "wins". This means the percentage of days over the date range
              that the stock hit a high point of 3% gain from the open price. Ideally you would use this list as 
              potentials to invest in at open of market and sell at some point during the day.
            </i>
            <br></br>
            <Card className="date-input-card">
              <CardHeader title="Select Dates" />
              <CardContent>
                <DateRange handleChange={this.handleChange} 
                          startDate={this.state.startDate} 
                          endDate={this.state.endDate}
                />
                <Button color="primary" onClick={this.fetchStockData}>Update</Button>
              </CardContent>
            </Card>
            {this.renderWins()}
            <TextField
              id="newSymbol"
              label="New Symbol"
              type="text"
              InputLabelProps={{
                shrink: true,
              }}
              value={this.state.newSymbol}
              onChange={this.handleChange('newSymbol')}
              margin="normal"
            />
            <Button onClick={this.addSymbol}>Add</Button>
            <Button color="secondary" onClick={this.removeSymbol}>Remove</Button>
          </CardContent>
        </Card>
      </div>
      
    )
  }
}

export {Wins};