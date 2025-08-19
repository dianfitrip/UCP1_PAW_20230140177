const express = require('express');
const router = express.Router();
const db = require('../database/db');


router.get('/', (req, res) => {
    db.query('SELECT * FROM buku', (err, results) => {
        if (err) return res.status(500).json({ error: 'Internal Server Error' });
        res.json(results);
    });
});


router.post('/', (req, res) => {
    const { judul, penulis, tahun_terbit } = req.body;
    if (!judul || !penulis || !tahun_terbit) {
        return res.status(400).json({ error: 'Judul, penulis, dan tahun terbit tidak boleh kosong' });
    }

    const query = 'INSERT INTO buku (judul, penulis, tahun_terbit) VALUES (?, ?, ?)';
    db.query(query, [judul.trim(), penulis.trim(), tahun_terbit], (err, results) => {
        if (err) return res.status(500).json({ error: 'Gagal menambahkan buku' });
        const newBook = { id: results.insertId, judul, penulis, tahun_terbit };
        res.status(201).json(newBook);
    });
});


router.put('/:id', (req, res) => {
    const { id } = req.params;
    const { judul, penulis, tahun_terbit } = req.body;
    if (!judul || !penulis || !tahun_terbit) {
        return res.status(400).json({ error: 'Data tidak boleh kosong' });
    }

    const query = 'UPDATE buku SET judul = ?, penulis = ?, tahun_terbit = ? WHERE id = ?';
    db.query(query, [judul, penulis, tahun_terbit, id], (err, results) => {
        if (err) return res.status(500).json({ error: 'Gagal memperbarui buku' });
        if (results.affectedRows === 0) return res.status(404).json({ error: 'Buku tidak ditemukan' });
        res.json({ id, judul, penulis, tahun_terbit });
    });
});


router.delete('/:id', (req, res) => {
    const { id } = req.params;
    db.query('DELETE FROM buku WHERE id = ?', [id], (err, results) => {
        if (err) return res.status(500).json({ error: 'Gagal menghapus buku' });
        if (results.affectedRows === 0) return res.status(404).json({ error: 'Buku tidak ditemukan' });
        res.status(204).send();
    });
});

module.exports = router;