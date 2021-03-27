const app = require("express")();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const productRouter = require("./src/routes/products");
const categoriesRouter = require("./src/routes/categories");
const adminRouter = require("./src/routes/admin");
const authRouter = require("./src/routes/auth");
const { authorize } = require("./src/middlewares/auth");

app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "OPTIONS, GET, POST, PUT, PATCH, DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, authorization");
  next();
});

app.use("/auth", authRouter);
app.use("/products", productRouter);
app.use("/categories", categoriesRouter);
app.use("/admin", adminRouter);

mongoose
  .connect(process.env.DB_CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(process.env.PORT || 3000, () =>
      console.log("App is listening up and running")
    );
  })
  .catch((err) => console.log(err));
