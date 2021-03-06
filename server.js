const express = require("express");
const articleRouter = require("./routes/articles");
const mongoose = require("mongoose");
const Article = require("./models/article");
const methodOverride = require("method-override");
const app = express();

const url = process.env.DB_URL || "mongodb://localhost/blog";

mongoose.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(
  express.urlencoded({
    extended: false,
  })
);
app.use(methodOverride("_method"));

app.get("/", async (req, res) => {
  const articles = await Article.find().sort({
    createdAt: "desc",
  });
  res.render("articles/index", {
    articles: articles,
  });
});

app.use("/articles", articleRouter);
const port = process.env.PORT || 3000;
app.listen(port);
