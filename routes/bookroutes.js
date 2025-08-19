const express = require('express');
const router = express.Router();
const db = require('../database/db.js');


router.get('/', (req, res) => {
  db.query('SELECT * FROM books', (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Internal server error' });
    }
    res.render('book', {
      layout: 'layouts/main-layout',
      title: 'Daftar Buku',
      books: results
    });
  });
});


router.post('/', (req, res) => {
  const { nama_buku, kategori } = req.body;
  if (!nama_buku || !kategori) {
    return res.status(400).json({ error: 'Nama buku dan kategori harus diisi' });
  }

  db.query(
    'INSERT INTO books (nama_buku, kategori) VALUES (?, ?)',
    [nama_buku, kategori],
    (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: 'Gagal menambahkan buku' });
      }
      res.redirect('/books');
    }
  );
});


router.put('/:id', (req, res) => {
  const { id } = req.params;
  const { nama_buku, kategori } = req.body;

  db.query(
    'UPDATE books SET nama_buku = ?, kategori = ? WHERE id = ?',
    [nama_buku, kategori, id],
    (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: 'Gagal mengupdate buku' });
      }
      if (result.affectedRows === 0) {
        return res.status(404).json({ error: 'Buku tidak ditemukan' });
      }
      res.redirect('/books');
    }
  );
});


router.delete('/:id', (req, res) => {
  const { id } = req.params;

  db.query('DELETE FROM books WHERE id = ?', [id], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Gagal menghapus buku' });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Buku tidak ditemukan' });
    }
    res.redirect('/books');
  });
});

module.exports = router;