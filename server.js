require("dotenv").config();
const express = require("express");
const app = express();
const port = process.env.PORT;
const db = require("./database/db.js");
const bukuRoutes = require("./routes/buku.js");
const expressLayouts = require("express-ejs-layouts");


app.set("view engine", "ejs");
app.use(expressLayouts);
app.set('layout', 'main-layout');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use("/buku", bukuRoutes);


app.get("/", (req, res) => {
  res.render("index", {
    title: "Home",
  });
});

app.get("/contact", (req, res) => {
  res.render("contact", {
    title: "Contact",
  });
});

app.get("/perpustakaan", (req, res) => {
  db.query("SELECT * FROM buku ORDER BY id DESC", (err, results) => {
    if (err) {
      console.error("Error fetching books:", err);
      return res.status(500).send("Internal Server Error");
    }
    res.render("perpustakaan", {
      title: "Perpustakaan",
      books: results,
    });
  });
});


app.use((req, res) => {
  res.status(404).send("404 - Halaman tidak ditemukan");
});


app.listen(port, () => {
  console.log(`Server berjalan di http://localhost:${port}`);
});