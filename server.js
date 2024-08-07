const { createServer } = require('http');
const { parse } = require('url');
const next = require('next');
const socketIo = require('socket.io');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = createServer((req, res) => {
    const parsedUrl = parse(req.url, true);
    handle(req, res, parsedUrl);
  });

  const port = process.env.PORT || 3000;

  // Configurar Socket.io Server
  const io = socketIo(server);

  io.on('connection', (socket) => {
    console.log('Client connected');

    socket.on('addPedido', (data) => {
      console.log('Recieved from API ::', data);
      io.emit('updatePedido', data);
    });

    socket.on('updateProducto', (data) => {
      console.log('Recieved from API ::', data);
      io.emit('updateProduct', data);
    });

    socket.on('updateSucursal', (data) => {
      console.log('Recieved from API ::', data);
      io.emit('updateSuc', data);
    });

    socket.on('disconnect', () => {
      console.log('Client disconnected');
    });
  });

  server.listen(port, (err) => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${port}`);
  });
});
