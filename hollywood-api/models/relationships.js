const Models = require("./models");

Modles.Movie.hasAndBelongsToMany(Models.Actor);
// Modles.Actor.hasAndBelongsToMany(Models.Movie);