const app = require("./app");
require("./src/config/mongodb.config");
require("./src/routes/index");

const port = process.env.PORT || 8888;

app.get("/", (req, res) => {
  res.send("Welcome To Home Page");
});

app.get("*", (req, res) => {
  res.send("Page Not Found");
});

app.listen(port, () => {
  console.log(`Running On Port ${port}`);
});
