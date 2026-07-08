const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use(router);

// Exportamos el servidor para poder testearlo, o lo iniciamos si se ejecuta directamente
if (require.main === module) {
  server.listen(3001, () => {
    console.log('JSON Server está corriendo en el puerto 3001');
  });
}

module.exports = server;