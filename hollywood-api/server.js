const hapi = require("hapi");
const server = new hapi.Server();
const routes = require("./routes");
console.log(routes);

server.connection({
  port: 6001,
  host: "localhost",
  routes: { cors: true },
  router: { stripTrailingSlash: true }
});

server.route(routes);

server.start(err => {
  if (err) throw err;
  console.log(`Server started at ${server.info.uri}`);
})