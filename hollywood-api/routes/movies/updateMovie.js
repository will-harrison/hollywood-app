module.exports = {
  method: ["PUT", "PATCH"],
  path: "/api/movies/{movieId}",
  handler: function (request, reply) {
    let { movieId } = request.params;
    let movie = request.payload;
    this.models.Movie
      .get(movieId)
      .then(doc => doc.merge(movie).save())
      .then(res => reply(res))
      .catch(err => { reply(err) });
  }
}