module.exports = {
  method: "GET",
  path: "/api/movies/{movieId}",
  handler: function (request, reply) {
    let { movieId } = request.params;
    this.models.Movie
      .get(movieId)
      .getJoin({ actors: true })
      .then(res => reply(res))
      .catch(err => reply(err));
  }
}