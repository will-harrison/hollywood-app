module.exports = {
  method: "POST",
  path: "/api/movies/{movieId}/actor",
  handler: function (request, reply) {
    let { movieId } = request.params;
    let actor = request.payload;
    this.models.Movie
      .get(movieId)
      .then(movie => movie.addRelation("actors", actor))
      .then(res => reply(res))
      .catch(err => { console.log(err); reply(err) });
  }
}