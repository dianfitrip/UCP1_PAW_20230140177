require("dotenv").config();
const express = require("express");
const app = express();
const db = require("./database/db");
const bookRoutes = require("./routes/bookroutes");
const port = process.env.PORT || 3001;
const expressLayouts = require("express-ejs-layouts");


app.set("view engine", "ejs");
app.use(expressLayouts);
app.set("layout", "layouts/main-layout");
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

app.use("/books", bookRoutes);

app.get("/", (req, res) => {
  res.render("index", { title: "Home" });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).render("error", {
    message: "Terjadi kesalahan server",
    error: err.message,
  });
});

app.use((req, res) => {
  res.status(404).render("error", {
    message: "Halaman tidak ditemukan",
    error: "404 Not Found",
  });
});

app.listen(port, () => {
  console.log(`Server berjalan di http://localhost:${port}`);
});