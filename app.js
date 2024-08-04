const express = require('express');
const mysql = require('mysql');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'rootpassword',
  database: 'users_db'
});

db.connect((err) => {
  if (err) throw err;
  console.log('Connected to database');
});

app.post('/submit', (req, res) => {
  const { name, email } = req.body;
  const query = 'INSERT INTO users (name, email) VALUES (?, ?)';
  db.query(query, [name, email], (err, result) => {
    if (err) throw err;
    res.send('User added to database');
  });
});

app.listen(3000, () => {
  console.log('Server running on port 3000');
});
