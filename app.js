const app = require("express")();

app.get("/", (req, res, next) => {
  res.json({ working: true });
});

app.listen(3000, () => console.log("App is listening on port 3000"));
