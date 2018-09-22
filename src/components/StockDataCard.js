import React from 'react';
import { Card, CardContent, CardHeader } from "@material-ui/core";

const StockDataCard = ({date, symbol, stockData}) => stockData && (
  <Card className="stock-data-card">
    <CardHeader title={`${symbol.toUpperCase()} (${date})`} />
    <CardContent>
      <h4>Open: {stockData["1. open"]}</h4>
      <h4>High: {stockData["2. high"]}</h4>
      <h4>Low: {stockData["3. low"]}</h4>
      <h4>Close: {stockData["4. close"]}</h4>
      <h4>Volume: {stockData["5. volume"]}</h4>
    </CardContent>
  </Card>
)

export {StockDataCard}