module.exports = (db) => {
  const type = db.type;
  const Movie = db.createModel("Movie", {
    title: type.string().required(),
    summary: type.string().required(),
    rottenTomatoes: type.number().min(0).max(100).required(),
    rating: type.string().enum(["G", "PG", "PG-13", "R", "NC17", "NR"]).required(),
    poster: type.string().required(),
    director: type.string(),
    writer: type.string(),
    releaseDate: type.date()
  });
  return Movie;
}