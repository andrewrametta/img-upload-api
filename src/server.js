const app = require("./app");
const knex = require("knex");

const { PORT, DATBASE_URL } = require("./config");

const db = knex({
  client: "pg",
  connection: DATBASE_URL,
});

app.set("db", db);

app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`);
});
