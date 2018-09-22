import React from 'react';

const StockIcon = (callback, symbol) => {
  fetch(`https://api.iextrading.com/1.0/stock/${symbol}/logo`)
      .then(response => response.json())
      .then(responseJson => {
        callback(responseJson)
      })
}

export { StockIcon }