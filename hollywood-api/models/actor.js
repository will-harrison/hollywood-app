module.exports = (db) => {
  const type = db.type;
  const Actor = db.createModel("Actor", {
    name: type.string().required(),
    age: type.number().required(),
    gender: type.string().enum(["male", "female"]).required()
  });
  return Actor;
}