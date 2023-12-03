const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { Pool } = require('pg');
const jwt = require('jsonwebtoken');
const salausavain = 'salausavain';

const app = express();
const port = 5000;

app.use(bodyParser.json());
app.use(cors());

// Tietokantayhteys renderiin
const pool = new Pool({
    user: 'eeva',
    host: 'dpg-cl72ug1h9grs73eag5n0-a.frankfurt-postgres.render.com',
    database: 'kinodb_n58n',
    password: 'giMExHitidVvYFnYLeZ2ETouv9Y6CmxY',
    port: 5432,
    ssl: {
        rejectUnauthorized: false, 
    },
});

// hakee käyttäjän tiedot
async function fetchUserData(usernick) {
    try {
        const result = await pool.query('SELECT id, usernick, email FROM customer WHERE usernick = $1', [usernick]);

        if (result.rows.length > 0) {
            const user = result.rows[0];
            return { id: customer.id, usernick: customer.usernick, email: customer.email };
        } else {
            return null; // Jos käyttäjää ei ole olemassa
        }
    } catch (error) {
        console.error('Error fetching user data:', error);
        throw error;
    }
}
// käyttäjätunnuksen rekisteröinti
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

// yhteisön luominen
app.post('/groups', async (req, res) => {
    const { userid, groupid } = req.body;

    try {
        const result = await pool.query('INSERT INTO groups (userid, groupid) VALUES ($1, $2) RETURNING *', [userid, groupid]);
        res.json({ success: true, message: 'Yhteisön luominen onnistui', group: result.rows[0] });
    } catch (error) {
        console.error('Error executing query', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
});

// Kirjautuminen
app.post('/login', async (req, res) => {
    const { usernick, password } = req.body;

    try {
        const result = await pool.query('SELECT * FROM customer WHERE usernick = $1 AND password = $2', [usernick, password]);

        if (result.rows.length > 0) {
            
            console.log('Autentikaatio onnistui, kirjauduttu sisään');

            const user = result.rows[0];
            const token = jwt.sign({ usernick: user.usernick }, salausavain, { expiresIn: '1h' });
            res.json({ success: true, token, message: 'Autentikaatio onnistui' });
        } else {
            res.status(401).json({ success: false, message: 'Invalid credentials' });
        }

    } catch (error) {
        console.error('Error executing query', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
});

// Varmistetaan, että käyttäjä on kirjautunut sisään
app.get('/protected-route', (req, res) => {
    
    const token = req.headers.authorization;

    if (!token) {
        return res.status(401).json({ success: false, message: 'Unauthorized' });
    }

    try {
        const decoded = jwt.verify(token, salausavain);
        const userData = fetchUserData(decoded.usernick);

        res.json({ success: true, message: 'Protected route accessed successfully', userData });
    } catch (error) {
        res.status(401).json({ success: false, message: 'Invalid token' });
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
