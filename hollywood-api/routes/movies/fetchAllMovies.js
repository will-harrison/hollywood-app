module.exports = {
  method: "GET",
  path: "/api/movies",
  handler: function (request, reply) {
    this.models.Movie
      .filter({})
      .getJoin({ actors: true })
      .then(res => reply(res))
      .catch(err => { console.log(err); reply(err) });
  }
}