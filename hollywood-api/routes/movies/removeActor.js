module.exports = {
  method: "DELETE",
  path: "/api/movies/{movieId}/actor",
  handler: function (request, reply) {
    let { movieId } = request.params;
    let actor = request.payload;
    this.models.Movie
      .get(movieId)
      .then(movie => movie.removeRelation("actors", actor))
      .then(res => reply(res))
      .catch(err => { console.log(err); reply(err) });
  }
}