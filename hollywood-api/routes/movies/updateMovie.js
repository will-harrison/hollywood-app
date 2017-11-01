module.exports = {
  method: ["PUT", "PATCH"],
  path: "/api/movies{movieId}",
  handler: function (request, reply) {
    reply();
  }
}