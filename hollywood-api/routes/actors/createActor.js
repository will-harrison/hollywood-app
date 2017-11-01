module.exports = {
  method: "POST",
  path: "/api/actors",
  handler: function (request, reply) {
    let actor = new this.models.Actor(request.payload);
    actor
      .save()
      .then(res => reply(res))
      .catch(err => reply(err));
  }
}