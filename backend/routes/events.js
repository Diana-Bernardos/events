// routes/events.js
const express = require('express');
const router = express.Router();
const db = require('../config/database');

// Obtener todos los eventos
router.get('/', (req, res) => {
  db.query('SELECT * FROM events ORDER BY event_date', (err, results) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(results);
  });
});

// Crear nuevo evento
router.post('/', (req, res) => {
  const { title, event_date, event_type, icon, color } = req.body;
  const query = 'INSERT INTO events (title, event_date, event_type, icon, color) VALUES (?, ?, ?, ?, ?)';
  
  db.query(query, [title, event_date, event_type, icon, color], (err, results) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.status(201).json({ id: results.insertId, ...req.body });
  });
});

// Eliminar evento
router.delete('/:id', (req, res) => {
  const query = 'DELETE FROM events WHERE id = ?';
  
  db.query(query, [req.params.id], (err, results) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.status(200).json({ message: 'Evento eliminado correctamente' });
  });
});

module.exports = router;