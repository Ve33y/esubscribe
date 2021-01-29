const { Pool } = require('pg');
const myURI = '';

const URI = process.env.PG_URI || myURI;

const pool = new Pool({
  connectionString: URI,
});

pool.query('CREATE TABLE IF NOT EXISTS subscribers (_id serial PRIMARY KEY, subscriber_email VARCHAR (320) NOT NULL, topic VARCHAR (45) NOT NULL)', (err, res) => {
  // console.log(err, res);
});

module.exports = pool;