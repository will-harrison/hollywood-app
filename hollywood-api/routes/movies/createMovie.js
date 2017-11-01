module.exports = {
  method: "POST",
  path: "/api/movies",
  handler: function (request, reply) {
    let movie = new this.models.Movie(request.payload);
    movie
      .save()
      .then(res => reply(res))
      .catch(err => reply(err));
  }
}