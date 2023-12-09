database.js-.env
const { Client } = require("pg")
const dotenv = require("dotenv")
dotenv.config()
 
const connectDb = async () => {
    try {
        const client = new Client({
            user: process.env.PGUSER,
            host: process.env.PGHOST,
            database: process.env.PGDATABASE,
            password: process.env.PGPASSWORD,
            port: process.env.PGPORT
        })
 
        await client.connect()
        const res = await client.query('SELECT * FROM some_table')
        console.log(res)
        await client.end()
    } catch (error) {
        console.log(error)
    }
}
 
connectDb()

//import {Pool} from 'pg';
const {Pool} = require('pg');

const pgPool = new Pool({
    user: 'eeva',
    host: 'dpg-cl72ug1h9grs73eag5n0-a.frankfurt-postgres.render.com',
    database: 'kinodb_n58n',
    password: 'giMExHitidVvYFnYLeZ2ETouv9Y6CmxY',
    port: 5678,
});
 


const sql = {
    GET_STUDENT: 'SELECT fname, lname, username FROM student WHERE username=$1',
    GET_ALL_STUDENTS: 'SELECT fname, lname, username FROM student',
    ADD_NOTE: 'INSERT INTO note (msg, student_uname) VALUES ($1, $2)'
}


console.log(await pool.query('SELECT NOW()'));
 
pool.query('select * from users', (err, res) => {
    return console.log(res.rows);
});

const client = new Client({
    user: 'dbuser',
    host: 'database.server.com',
    database: 'mydb',
    password: 'secretpassword',
    port: 3211,
  })
   
  await client.connect()
   
  console.log(await client.query('SELECT NOW()'))
   
  await client.end()
main
