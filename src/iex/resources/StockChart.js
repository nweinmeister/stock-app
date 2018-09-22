import React from 'react';

const StockChart = (callback, symbol) => {
  fetch(`https://api.iextrading.com/1.0/stock/${symbol}/chart`)
      .then(response => response.json())
      .then(responseJson => {
        callback(responseJson)
      })
}

export { StockChart }