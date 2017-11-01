module.exports = {
  method: "GET",
  path: "/api/actors/{actorId}",
  handler: function (request, reply) {
    let { actorId } = request.params;
    this.models.Actor
      .get(actorId)
      .getJoin({ movies: true })
      .then(res => reply(res))
      .catch(err => reply(err));
  }
}