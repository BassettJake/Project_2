require('dotenv').config();

const express = require('express');
const path = require('path');
const {
  Pool
} = require('pg');
const PORT = process.env.PORT || 5000;

const connectionString = process.env.DATABASE_URL;

const pool = new Pool({
  connectionString: connectionString,
  ssl: {
    rejectUnauthorized: false
  }
});
pool.connect();

const app = express();
app.use(express.urlencoded({
  extended: true
}));

app.get('/viewCharacters', (req, res) => {
  const sqlCharacters = "SELECT * FROM characters";

  pool.query(sqlCharacters, function (err, results) {
    if (err) {
      console.log("Error in query: ");
      console.log(err);
    }
    console.log("Query " + sqlCharacters + " successful");
    res.send(results.rows);
  });
});
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static('public'))
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.get('/', (req, res) => res.render('pages/index'));
app.listen(PORT, () => console.log(`Listening on ${ PORT }`));