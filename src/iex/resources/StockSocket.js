import openSocket from 'socket.io-client';

const StockSocket = (callback, symbol) => {
  const  socket = openSocket('https://ws-api.iextrading.com/1.0/tops');

  socket.on('message', message => {
    console.log(JSON.parse(message))
    console.log(new Date(JSON.parse(message).lastUpdated))
    callback(JSON.parse(message));
  })

  socket.on('connect', () => {

    // Subscribe to topics (i.e. appl,fb,aig+)
    socket.emit('subscribe', symbol)
  })
}

export { StockSocket };