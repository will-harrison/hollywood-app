const thinky = require("thinky");
const config = require('../config');

const db = thinky({
  name: config.db.name,
  port: config.db.port,
  host: config.db.host,
});

const Actor = require("./actor")(db);
const Movie = require("./movie")(db);

Movie.hasAndBelongsToMany(Actor, "actors", "id", "id");
Actor.hasAndBelongsToMany(Movie, "movies", "id", "id");

module.exports = {
  Actor: Actor,
  Movie: Movie
};