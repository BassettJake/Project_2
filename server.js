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
app.post('/viewCharacters', (req, res) => {
  res.redirect('/viewCharacters');
});
app.get('/viewCharacters', function (req, res) {
  var sql = "SELECT * FROM characters";

  pool.query(sql, function (err, result) {

    if (err) {
      console.log("Error in query: ");
      console.log(err);
    }
    console.log("Back from DB with result: ");
    console.log(result.rows);

    var html = '<ul>';
    for(i in result.rows){
      html += '<li>' + result.rows[i] + '</li>';
    }

    html += '</ul>';

    var params = {
      dbResult: html
    }

    res.render('pages/viewCharacters', params);
  });
});
app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.get('/', (req, res) => res.render('pages/index'));
app.listen(PORT, () => console.log(`Listening on ${ PORT }`));