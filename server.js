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
  const sqlCharacters = "SELECT * FROM characters";
  const sqlGear = "SELECT * FROM gear WHERE gear.id = ";
  const sqlStats = "SELECT * FROM stats WHERE stats.id = ";

  let characterRes = getCharacters(sqlCharacters);
  let gearRes = getGear(sqlGear, characterRes);
  let statsRes = getStats(sqlStats, characterRes);
  buildHtml(characterRes, gearRes, statsRes);

  function getCharacters(sql) {
    pool.query(sql, function (err, result) {
      if (err) {
        console.log("Error in query: ");
        console.log(err);
      }
      console.log("Back from DB with result: ");
      console.log(result.rows);
    });
    console.log("HERE ONE");
    return result;
  }

  function getGear(sql, characterRes) {
    for (i in characterRes) {
      for (j in characterRes[i]) {
        sql = sql + characterRes[i][j];
        pool.query(sql, function (err, result) {

          if (err) {
            console.log("Error in query: ");
            console.log(err);
          }
          console.log("Back from DB with result: ");
          console.log(result.rows);
        });
        return result;
      }
    }
  }

  function getStats(sql, characterRes) {
    for (i in characterRes) {
      for (j in characterRes[i]) {
        sql = sql + characterRes[i][j];
        pool.query(sql, function (err, result) {

          if (err) {
            console.log("Error in query: ");
            console.log(err);
          }
          console.log("Back from DB with result: ");
          console.log(result.rows);
        });
        return result;
      }
    }
  }

  function buildHtml(characterRes, gearRes, statsRes) {
    console.log("HERE TWO");
  }
  var params = {
    dbResult: "testing"
  }
  res.render('pages/viewCharacters', params);
});
app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.get('/', (req, res) => res.render('pages/index'));
app.listen(PORT, () => console.log(`Listening on ${ PORT }`));