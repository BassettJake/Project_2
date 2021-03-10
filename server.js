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

  var results = pool.query(sql, function (err, result) {

    if (err) {
      console.log("Error in query: ");
      console.log(err);
    }
    console.log("Back from DB with result: ");
    console.log(result.rows);

    return result.rows;
  });
console.log(results);
  var html = '<section class="characterView">';
  for (i in results) {
    for (j in results[i]) {
      //dont print out the id
      if (j == 1) {
        html += '<section class="characterHeader">' +
          '<h1 id="characterName">' + results[i][j] + '</h1>';
      } else if (j == 2) {
        html += '<section class="characterCS">' +
          '<span class="characterCS">' + results[i][j] + '</span>';
      } else if (j == 3) {
        html += '<span class="characterCS">' + results[i][j] + '</span>' +
          '</section></section>'; //close characterHeader and characterCS
      } else if (j == 4) {
        var sqlGear = "SELECT * FROM gear WHERE gear.id = " + results[i][j];

        var resultsGear = pool.query(sqlGear, function (err, gear) {

          if (err) {
            console.log("Error in query: ");
            console.log(err);
          }
          console.log("Back from DB with result: ");
          console.log(gear.rows);

          return gear.rows;
        });
        console.log(resultsGear);
        for (g in resultsGear) {
          for (gr in resultsGear[g]) {
            if (gr == 1) {
              html += '<section id="characterGear">' +
                '<span class="characterGear">' + resultsGear[g][gr] + '</span>';
            } else if (gr == 2) {
              html += '<span class="characterGear">' + resultsGear[g][gr] + '</span>' +
                '</section>'; //close characterGear
            }

          }
        }
      } else if (j == 5) {
        console.log("HERE1");
        var sqlStats = "SELECT * FROM stats WHERE stats.id = ";
console.log("HERE2");
        var resultsStats = pool.query(sqlStats, function (err, stats) {

          if (err) {
            console.log("Error in query: ");
            console.log(err);
          }
          console.log("Back from DB with result: ");
          console.log(stats.rows);

          return stats.rows;
        });
        console.log(resultsStats);
        for (s in resultsStats) {
          for (sr in resultsStats[g]) {
            if (sr == 1) {
              html += '<section id="characterStats">' +
                '<span class="characterStat">' + resultsStats[s][sr] + '</span>';
            } else if (sr == 2) {
              html += '<span class="characterStat">' + resultsStats[s][sr] + '</span>';
            } else if (sr == 3) {
              html += '<span class="characterStat">' + resultsStats[s][sr] + '</span>';
            } else if (sr == 4) {
              html += '<span class="characterStat">' + resultsStats[s][sr] + '</span>' +
                '</section>'; //close characterStats
            }

          }
        }
      } else if(j == 6){
        html += '<section id="characterBackstory>' + 
        '<p id="characterBackstoryP">' + results[i][j] + '</p>' +
        '</section>'; //close characterBackstory
      }
    }
  }
  html += '</section>'; //close characterView
  var params = {
    dbResult: html
  }
  res.render('pages/viewCharacters', params);
});
app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.get('/', (req, res) => res.render('pages/index'));
app.listen(PORT, () => console.log(`Listening on ${ PORT }`));