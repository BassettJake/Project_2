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
  const sqlGear = "SELECT * FROM gear WHERE gear.id = ";
  const sqlStats = "SELECT * FROM stats WHERE stats.id = ";

  pool.query(sqlCharacters, function (err, charRes) {
    if (err) {
      console.log("Error in query: ");
      console.log(err);
    }
    console.log("Query " + sqlCharacters + " successful");
    
    //get gear
    for(i in charRes.rows){
      var sqlG = sqlGear + charRes.rows[i].id;
      pool.query(sqlG, function(err, gearRes){
        if (err) {
          console.log("Error in query: ");
          console.log(err);
        }
        console.log("Query " + sqlGear + " successful");
        res.send(charRes.rows[i]);
        res.send(gearRes.rows);
      });
    }


    console.log(charRes.rows[0]['id']);
    res.send(charRes.rows);
  });
});
app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.get('/', (req, res) => res.render('pages/index'));
app.listen(PORT, () => console.log(`Listening on ${ PORT }`));