module.exports = {
  method: "DELETE",
  path: "/api/movies/{movieId}",
  handler: function (request, reply) {
    let { movieId } = request.params;
    this.models.Movie
      .get(movieId)
      .then(doc => doc.delete())
      .then(res => reply(res))
      .catch(err => { console.log(err); reply(err) });
  }
}