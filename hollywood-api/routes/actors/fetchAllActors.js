module.exports = {
  method: "GET",
  path: "/api/actors",
  handler: function (request, reply) {
    this.models.Actor
      .filter({})
      .getJoin({ movies: true })
      .then(res => reply(res))
      .catch(err => reply(res));
  }
}