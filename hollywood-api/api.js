const routes = require("./routes");
const models = require("./models");

module.exports.register = function (server, options, next) {
  server.bind({
    models: models
  });
  server.route(routes);
  return next();
};

module.exports.register.attributes = {
  name: "api",
  version: "1.0.0"
};