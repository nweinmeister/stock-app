const StockDataMapper = (rawStockData) => {
  return(
    rawStockData.map((stock_data) => {
      return {name: stock_data.date, price: stock_data.price}
    })
  )
}

export {StockDataMapper};