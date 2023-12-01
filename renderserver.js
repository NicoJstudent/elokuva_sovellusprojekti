const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { Pool } = require('pg');

const app = express();
const port = 5000;

app.use(bodyParser.json());
app.use(cors());

const pool = new Pool({
  user: 'eeva',
  host: 'dpg-cl72ug1h9grs73eag5n0-a.frankfurt-postgres.render.com',
  database: 'kinodb_n58n',
  password: 'giMExHitidVvYFnYLeZ2ETouv9Y6CmxY',
  port: 5432,
  ssl: {
    rejectUnauthorized: false, // Use only for development if your PostgreSQL server uses a self-signed certificate
  },
});
//rekisteröinnin koodit
app.post('/register', async (req, res) => {
    const { usernick, password, email } = req.body;
  
    try {
      const result = await pool.query('INSERT INTO customer (usernick, password, email) VALUES ($1, $2, $3) RETURNING *', [usernick, password, email]);
  
      res.json({ success: true, message: 'Rekisteröinti onnistui', user: result.rows[0] });
    } catch (error) {
      console.error('Error executing query', error);
      res.status(500).json({ success: false, message: 'Internal server error' });
    }
  });

app.post('/login', async (req, res) => {
  const { usernick, password } = req.body;

  try {
    const result = await pool.query('SELECT * FROM users WHERE usernick = $1 AND password = $2', [usernick, password]);

    if (result.rows.length > 0) {
      res.json({ success: true, message: 'Kirjautuminen onnistui' });
    } else {
      res.status(401).json({ success: false, message: 'Invalid credentials' });
    }
  } catch (error) {
    console.error('Error executing query', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
