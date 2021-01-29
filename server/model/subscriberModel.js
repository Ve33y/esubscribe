const { Pool } = require('pg');
const myURI = '';

const URI = process.env.PG_URI || myURI;

const pool = new Pool({
  connectionString: URI,
});

// this will create both tables as soon as someone subscribes
pool.query('CREATE TABLE IF NOT EXISTS subscribers (_id serial PRIMARY KEY, subscriber_email VARCHAR (320) NOT NULL, topic VARCHAR (45) NOT NULL); CREATE TABLE IF NOT EXISTS messages (_id serial PRIMARY KEY, topic VARCHAR (45) NOT NULL, message VARCHAR(500));', (err, res) => {
  // console.log(err, res);
});

module.exports = pool;