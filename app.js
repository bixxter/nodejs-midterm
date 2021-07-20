const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const blogRoutes = require("./routes/blogRoutes");
const authRoutes = require("./routes/authRoutes");
const { requireAuth, checkUser } = require("./middleware/authMiddleware");
require('dotenv').config()
//express app
const app = express();
//register view engine
const PORT = process.env.PORT || 3000;
const dbURL = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@nodeblog.rwbgn.mongodb.net/nodeblog?retryWrites=true&w=majority`;
mongoose
  .connect(dbURL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((result) => {
    app.listen(PORT);
  })
  .catch((err) => {
    console.log(err);
  });
app.set("view engine", "ejs");

// middleware & static files(.css)
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(morgan("dev"));

// routes
app.get("*", checkUser);
app.get("/", (req, res) => {
  res.render("home");
});

// blog routes
app.use("/blogs", requireAuth, blogRoutes);
app.use(authRoutes);
//404
app.use((req, res) => {
  res.status(404).render("404", { title: "404 ERROR" });
});
