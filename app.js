const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(bodyParser.json());

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'veterinaria'
});

db.connect(err => {
    if (err) throw err;
    console.log('Conectado a la base de datos.');
});

// CRUD para animales
app.get('/animales', (req, res) => {
    const sql = `SELECT * FROM animales`;
    db.query(sql, (err, results) => {
        if (err) throw err;
        res.json(results);
    });
});

app.post('/animales', (req, res) => {
    const { nombre, especie, raza, edad } = req.body;
    const sql = `INSERT INTO animales (nombre, especie, raza, edad) VALUES (?, ?, ?, ?)`;
    db.query(sql, [nombre, especie, raza, edad], (err, result) => {
        if (err) throw err;
        res.json({ id: result.insertId, nombre, especie, raza, edad });
    });
});

app.put('/animales/:id', (req, res) => {
    const { nombre, especie, raza, edad } = req.body;
    const sql = `UPDATE animales SET nombre = ?, especie = ?, raza = ?, edad = ? WHERE id = ?`;
    db.query(sql, [nombre, especie, raza, edad, req.params.id], err => {
        if (err) throw err;
        res.sendStatus(200);
    });
});

app.delete('/animales/:id', (req, res) => {
    const sql = `DELETE FROM animales WHERE id = ?`;
    db.query(sql, [req.params.id], err => {
        if (err) throw err;
        res.sendStatus(200);
    });
});

// CRUD para vacunas asociadas a un animal específico
app.get('/animales/:id/vacunas', (req, res) => {
    const sql = `SELECT * FROM vacunas WHERE animal_id = ?`;
    db.query(sql, [req.params.id], (err, results) => {
        if (err) throw err;
        res.json(results);
    });
});

app.post('/vacunas', (req, res) => {
    const { animal_id, nombre, fecha } = req.body;
    const sql = `INSERT INTO vacunas (animal_id, nombre, fecha) VALUES (?, ?, ?)`;
    db.query(sql, [animal_id, nombre, fecha], (err, result) => {
        if (err) throw err;
        res.json({ id: result.insertId, animal_id, nombre, fecha });
    });
});

app.listen(3000, () => {
    console.log('Servidor corriendo en http://localhost:3000');
});
