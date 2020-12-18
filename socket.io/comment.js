const socketIO = require('../app.js');

const sendMsg = (data) => {
  socketIO.io.socket.emit('send', 'Hello');
};
module.exports = { sendMsg };
