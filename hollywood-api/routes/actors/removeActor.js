module.exports = {
  method: "DELETE",
  path: "/api/actors/{actorId}",
  handler: function (request, reply) {
    let { actorId } = request.params;
    this.models.Actor
      .get(actorId)
      .then(doc => doc.delete())
      .then(res => reply(res))
      .catch(err => { reply(err) });
  }
}