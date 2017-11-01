module.exports = {
  method: ["PATCH", "PUT"],
  path: "/api/actors/{actorId}",
  handler: function (request, reply) {
    let { actorId } = request.params;
    let actor = request.payload;
    this.models.Actor
      .get(actorId)
      .then(doc => doc.merge(actor).save())
      .then(res => reply(res))
      .catch(err => { reply(err) });
  }
}