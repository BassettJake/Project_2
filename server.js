require('dotenv').config();

const express = require('express');
const {
  readFile
} = require('fs');
const ejs = require('ejs');
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

app.post('/deleteCharacter', (req, res) => {
  const sqlCharacters = "DELETE FROM characters WHERE id=" + req.body.cid;

  pool.query(sqlCharacters, function (err, results) {
    if (err) {
      console.log("Error in query: ");
      console.log(err);
    }
    console.log("Query " + sqlCharacters + " successful");
    res.send(results.rows);
  });
});

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
app.post('/createCharacter', (req, res) => {

  var cname = req.body.cname;
  var cspecies = req.body.cspecies;
  var cclass = req.body.cclass;
  var cbackstory = req.body.cbackstory;
  var cweapon = req.body.cweapon;
  var carmor = req.body.carmor;
  var cstrength = req.body.cstrength;
  var cagility = req.body.cagility;
  var cwisdom = req.body.cwisdom;
  var cintelligence = req.body.cintelligence;

  const sqlCharacters = "INSERT INTO characters (name, species, class, backstory, weapon, armor, strength, agility, wisdom, intelligence)" +
  "VALUES ('" + cname + "','" + cspecies + "','"+ cclass + "','"+ cbackstory + "','" + cweapon + "','" + carmor + "','" + cstrength + "','" + cagility + "','"+ cwisdom + "','"+ cintelligence + "')";

  pool.query(sqlCharacters, function (err, results) {
    if (err) {
      console.log("Error in query: ");
      console.log(err);
    }
    console.log("Query " + sqlCharacters + " successful");
    console.log(results.rows);
  });
  res.render('pages/index');
});
app.get('/home', (req, res) => {
  res.send("Home");
});
app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.get('/', (req, res) => res.render('pages/index'));
app.get('/createChar', (req, res) => {
  res.render('pages/createCharacter');
});
app.get('/createNext1', (req, res) => {
  res.render('pages/createNext1');
});
app.get('/createNext2', (req, res) => {
  res.render('pages/createNext2');
});
app.get('/createConfirm', (req, res) => {
  res.render('pages/createConfirm');
});
app.listen(PORT, () => console.log(`Listening on ${ PORT }`));