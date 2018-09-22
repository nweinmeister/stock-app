import React from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend, CartesianGrid } from 'recharts';

const StockGraph = props => (
  <div>
    <h1>{props.stockSymbol}</h1>
    <LineChart title={props.stockSymbol} width={600} height={300} data={props.graphableStockData}>
      <XAxis dataKey="name"/>
      <YAxis/>
      <CartesianGrid strokeDasharray="3 3"/>
      <Tooltip/>
      <Legend />
      <Line type="monotone" dataKey="price" stroke="#8884d8" activeDot={{r: 8}}/>
    </LineChart>
  </div>
)

export {StockGraph};