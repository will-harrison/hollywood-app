const hapi = require("hapi");
const server = new hapi.Server();
const api = require("./api");

server.connection({
  port: 6001,
  host: "localhost",
  routes: { cors: true },
  router: { stripTrailingSlash: true }
});

server.register([
  { register: api }
], () => {
  server.start(err => {
    if (err) throw err;
    console.log(`Server started at ${server.info.uri}`);
  })
})

