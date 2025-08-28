const app = require('./server/index.cjs');

const PORT = 9696;

const serverInstance = app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

// Common Express app events
app.on('error', error => {
  console.error('Express app error:', error);
});

// Server-specific events
serverInstance.on('error', error => {
  console.error('Server error:', error);
});

serverInstance.on('listening', () => {
  console.log('Server is listening for connections');
});

serverInstance.on('connection', () => {
  console.log('New connection established');
});

serverInstance.on('close', () => {
  console.log('Server closed');
});
