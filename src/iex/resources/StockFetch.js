import React from 'react';

const StockFetch = (callback, symbol) => {
  fetch(`https://api.iextrading.com/1.0/stock/${symbol}/chart/3m`)
      .then(response => response.json())
      .then(responseJson => {
        callback(responseJson)
      })
}

export { StockFetch }