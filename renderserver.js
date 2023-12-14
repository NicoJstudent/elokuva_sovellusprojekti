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
app.use(express.static('public'));



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

const customer = [
    { usernick: 'user1', email: 'user1@example.com' },
    { usernick: 'user2', email: 'user2@example.com' },
];

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
app.post('/group_create', async (req, res) => {
    const { usernick, group_name } = req.body;

    try {
        const owner_id_result = await pool.query('SELECT id FROM customer WHERE usernick = $1', [usernick]);

        if (owner_id_result.rows.length === 0) { // Errori jos käyttäjää ei ole olemassa
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        const owner_id = owner_id_result.rows[0].id;
        //const applyList = await pool.query('INSERT INTO apply_list (user_id, application_date) VALUES (null, null) RETURNING apply_list_id');
        //const applyListId = applyList.rows[0].apply_list_id;
        const result = await pool.query('INSERT INTO groups (owner_id, group_name, creation_date, members) VALUES ($1, $2, CURRENT_TIMESTAMP, $3) RETURNING *', [owner_id, group_name, [owner_id]]);

        res.json({ success: true, message: 'Yhteisön luominen onnistui', group: result.rows[0] });
    } catch (error) {
        console.error('Error executing query', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
});

app.post('/liittymispyynto', async (req, res) => {
    const { usernick, group_id } = req.body;

    try {
        const user_id_result = await pool.query('SELECT id FROM customer WHERE usernick = $1', [usernick]);
        const user_id = user_id_result.rows[0]?.id;

        // Insert data into the apply_list table
        await pool.query('INSERT INTO apply_list (user_id, application_date, group_id) VALUES ($1, CURRENT_DATE, $2) RETURNING apply_list_id', [user_id, group_id]);
        //
        //const applyListId = applyListResult.rows[0].apply_list_id;

        // Insert data into the groups table
        //const groupResult = await pool.query('UPDATE groups SET apply_list_id = $1 WHERE id = $2 RETURNING id', [applyListId, group_id]);
        //const groupId = groupResult.rows[0].id;

        res.json({ success: true, message: 'Liittymispyyntö lähetetty' });
    } catch (error) {
        console.error('Virhe tietokantaan tallentamisessa:', error);
        res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
});

app.get('/groups_list', async (req, res) => {
    try {
        const result = await pool.query('SELECT id, group_name FROM groups');
        const groups = result.rows;

        res.json({ success: true, groups });
    } catch (error) {
        console.error('Error fetching groups:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
});

app.get('/groups_role', async (req, res) => {
    const { group_id, usernick } = req.query;

    try {
        const user_id_result = await pool.query('SELECT id FROM customer WHERE usernick = $1', [usernick]);
        const user_id = user_id_result.rows[0]?.id;

        if (user_id_result.rows.length === 0) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        const result = await pool.query('SELECT id, group_name, owner_id, members FROM groups WHERE id = $1', [group_id]);
        const group = result.rows[0];


        if (!group) {
            return res.status(404).json({ success: false, message: 'Group not found' });
        }

        const isOwner = group.owner_id === user_id;
        const isMember = group.members.includes(user_id);

        if (isOwner) { // Tarkistaa roolin yhteisössä (omistaja, jäsen, ei mitään)
            res.json({ success: true, group, role: 'owner' });
        } else if (isMember) {
            res.json({ success: true, group, role: 'member' });
        } else {
            res.json({ success: true, group, role: 'none' });
        }
    } catch (error) {
        console.error('Error fetching group details:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
});

app.get('/customer', async (req, res) => {
    try {
        const result = await pool.query('SELECT usernick, email FROM customer WHERE usernick = $1', [req.query.usernick]);
        res.json(result.rows[0]);
    } catch (error) {
        console.error('Error executing query', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// käyttäjätunnuksen poistaminen
app.delete('/customer/:usernick', async (req, res) => {
    const { user_Ids } = req.params;

    try {
        const result = await pool.query('DELETE FROM customer WHERE usernick = $1', [user_Ids]);
        res.json({ success: true, message: 'Käyttäjätunnuksen poistaminen onnistui' });
    } catch (error) {
        console.error('Error executing query', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.get('/customer', async (req, res) => {
    const userIds = req.query.userIds;

    try {
        // Assuming your PostgreSQL query is something like this
        const queryResult = await pool.query('SELECT id, usernick FROM customer WHERE id = $1', [userIds]);

        // Create a map of user IDs to nicknames
        const nicknamesMap = {};
        queryResult.rows.forEach((row) => {
            nicknamesMap[row.id] = row.usernick;
        });

        res.json(nicknamesMap);
    } catch (error) {
        console.error('Error executing query', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.get('/groups', async (req, res) => {
    const { usernick } = req.query;

    try {
        const result = await pool.query('SELECT userid, groupid FROM groups WHERE usernick = $1', [usernick]);

        if (result.rows.length > 0) {
            res.json({ userid: result.rows[0].userid, groupid: result.rows[0].groupid });
        } else {
            res.status(404).json({ error: 'User not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.get('/groups_name', async (req, res) => {
    const { group_id } = req.query;
    try {
        const result = await pool.query('SELECT group_name FROM groups WHERE id = $1', [group_id]);

        if (result.rows.length > 0) {
            res.json({ group_name: result.rows[0].group_name });
        } else {
            res.status(404).json({ error: 'Group not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.get('/applications/:group_id', async (req, res) => {
    const { group_id } = req.params;

    try {
        const { rows } = await pool.query('SELECT user_id, application_date FROM apply_list WHERE group_id = $1', [group_id]);

        res.json(rows);
    } catch (error) {
        console.error('Error executing query', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.put('/application/:group_id/:user_id', async (req, res) => {
    const { group_id, user_id } = req.params;

    try {
        await pool.query('UPDATE groups SET members = array_append(members, $1) WHERE id = $2', [user_id, group_id]);
        await pool.query('DELETE FROM apply_list WHERE user_id = $1 AND group_id = $2', [user_id, group_id]);

        res.json({ success: true, message: 'Apply accepted successfully' });
    } catch (error) {
        console.error('Error executing query', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.delete('/application/:group_id/:user_id', async (req, res) => {
    const { group_id, user_id } = req.params;

    try {
        await pool.query('DELETE FROM apply_list WHERE user_id = $1 AND group_id = $2', [user_id, group_id]);
        res.json({ success: true, message: 'Apply rejected successfully' });

    } catch (error) {
        console.error('Error executing query', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Kirjautuminen
app.post('/login', async (req, res) => {
    const { usernick, password } = req.body;

    try {
        const result = await pool.query('SELECT * FROM customer WHERE usernick = $1 AND password = $2', [usernick, password]);

        if (result.rows.length > 0) {
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


app.get('/reviewsList/:movieid', async (req, res) => {
    const { movieid } = req.params;

    try {
        const result = await pool.query('SELECT * FROM reviews WHERE movieid = $1', [movieid]);

        if (result.rows.length > 0) {
            res.json({ success: true, ratings: result.rows });
        } else {
            res.status(404).json({ success: false, message: 'Tälle elokuvalle ei ole annettu yhtään arvostelua' });
        }
    } catch (error) {
        console.error('Error executing query', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
});


app.get('/reviews', async (req, res) => {
    try {
        const { usernick } = req.query;
        const reviewsResult = await pool.query('SELECT rating, date, movieid FROM reviews WHERE usernick = $1', [usernick]);
        const reviews = reviewsResult.rows;

        res.setHeader('Content-Type', 'application/json');
        res.json({ success: true, message: 'Server: Reviews found', reviews });

    } catch (error) {
        console.error('Server: Error fetching reviews:', error.message);
        res.status(500).json({ success: false, error: error.message });
    }
});

app.get('/favorites', async (req, res) => {
    try {
        const { usernick } = req.query;
        const userResult = await pool.query('SELECT id FROM customer WHERE usernick = $1', [usernick]);

        if (userResult.rows.length === 0) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        const user_id = userResult.rows[0].id;

        const favoritesResult = await pool.query('SELECT movie_id FROM user_favorites WHERE user_id = $1', [user_id]);
        const favoriteMovies = favoritesResult.rows.map(row => row.movie_id);
        res.setHeader('Content-Type', 'application/json');
        res.json({ success: true, message: 'Server: Favorite movie list found', favoriteMovies });

    } catch (error) {
        console.error('Server: Error fetching favorite movie list:', error.message);
        res.status(500).json({ success: false, error: error.message });
    }
});

app.post('/add-to-favorites', async (req, res) => {
    try {
        const { usernick, movie_id } = req.body;

        // Haetaan id käyttäjänimellä
        const userResult = await pool.query('SELECT id FROM customer WHERE usernick = $1', [usernick]);

        if (userResult.rows.length === 0) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        const user_id = userResult.rows[0].id;


        await pool.query('INSERT INTO user_favorites (user_id, movie_id) VALUES ($1, $2)', [user_id, movie_id]);

        res.json({ success: true, message: 'Server: Movie added to favorites successfully' });
    } catch (error) {
        console.error('Server: Error adding movie to favorites:', error.message);
        res.status(500).json({ success: false, error: error.message });
        console.log(movie_id + ' ' + user_id)
    }
});

app.post('/arvostelut', async (req, res) => {
    try {
        const { rating, date, usernick, movieid } = req.body;

        const result = await pool.query('INSERT INTO reviews (rating, date, usernick, movieid) VALUES ($1, $2, $3, $4) RETURNING *', [rating, date, usernick, movieid]);

        res.json({ success: true, message: 'Arvostelun lisääminen onnistui', user: result.rows[0] });
    } catch (error) {
        console.error('Error saving rating to database:', error.message);
        res.status(500).json({ success: false, error: error.message });
    }
});

// Hakee arvostelujen määrät
app.get('/rowCount/:movieId', async (req, res) => {
    const { movieId } = req.params;

    try {
        const result = await pool.query('SELECT COUNT(*) FROM your_table_name WHERE movieid = $1', [movieId]);
        const rowCount = result.rows[0].count;

        res.json({ success: true, rowCount });
    } catch (error) {
        console.error('Error executing query', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

module.exports = app;