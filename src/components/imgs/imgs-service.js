const ImgsService = {
  getImgs(knex) {
    return knex.from("items").select("*");
  },
  insertImg(knex, newImg) {
    return knex
      .insert(newImg)
      .into("items")
      .returning("*")
      .then((rows) => {
        return rows[0];
      });
  },
};

module.exports = ImgsService;
