const socket = io();

document.getElementById('keylogger').addEventListener('keydown', (event) => {
  const key = event.key;
  socket.emit('keypress', key);
});
