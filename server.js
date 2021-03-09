require('dotenv').config();

const express = require('express');
const path = require('path');
const { Pool } = require('pg');
const PORT = process.env.PORT || 5000;

const connectionString = process.env.DATABASE_URL;

const pool = new Pool({connectionString: connectionString});

var sql = "SELECT * FROM stats";

pool.query(sql, function(err, result){

  if(err){
    console.log("Error in query: ");
    console.log(err);
  }
  console.log("Back from DB with result: ");
  console.log(result.rows);
});

const app = express();
app.use(express.urlencoded({
  extended: true
}));
app.post('/viewCharacters', (req, res) => {

  res.send("test");
  res.render('pages/index', params);
  res.end();

  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function(){
    if(this.readyState == 4 && this.status == 200){
      console.log("success");
    }
  };
  xhttp.open("GET", "pages/viewCharacters");
  xhttp.send();
});
app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.get('/', (req, res) => res.render('pages/index'));
app.listen(PORT, () => console.log(`Listening on ${ PORT }`));