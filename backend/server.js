const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

// Connect without specifying the database first
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
});

// Connect to MySQL
db.connect((err) => {
  if (err) {
    console.error('MySQL connection failed:', err.stack);
    return;
  }
  console.log('Connected to MySQL.');

  // Create the database if it doesn't exist
  db.query('CREATE DATABASE IF NOT EXISTS todo_db', (err) => {
    if (err) throw err;
    console.log('Database "todo_db" ready.');

    // Switch to the new database
    db.changeUser({ database: 'todo_db' }, (err) => {
      if (err) throw err;

      // Create the table if it doesn't exist
      const createTableQuery = `
        CREATE TABLE IF NOT EXISTS tasks (
          id INT AUTO_INCREMENT PRIMARY KEY,
          title VARCHAR(255) NOT NULL,
          description TEXT,
          completed BOOLEAN DEFAULT FALSE
        )
      `;
      db.query(createTableQuery, (err) => {
        if (err) throw err;
        console.log('Table "tasks" ready.');
      });
    });
  });
});

// Get all tasks
app.get('/tasks', (req, res) => {
  db.query('SELECT * FROM tasks', (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

// Add a new task
app.post('/tasks', (req, res) => {
  const { title, description } = req.body;
  db.query('INSERT INTO tasks (title, description) VALUES (?, ?)', [title, description], (err, result) => {
    if (err) throw err;
    res.json({ id: result.insertId, title, description, completed: false });
  });
});

// Delete a task
app.delete('/tasks/:id', (req, res) => {
  const { id } = req.params;
  db.query('DELETE FROM tasks WHERE id = ?', [id], (err, result) => {
    if (err) throw err;
    res.json({ success: true });
  });
});

// Update task completed status
app.put('/tasks/:id', (req, res) => {
  const { id } = req.params;
  const { completed } = req.body;
  db.query('UPDATE tasks SET completed = ? WHERE id = ?', [completed, id], (err, result) => {
    if (err) throw err;
    res.json({ success: true });
  });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
