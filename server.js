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

  var r = pool.query(sql, function (err, result) {

    if (err) {
      console.log("Error in query: ");
      console.log(err);
    }
    console.log("Back from DB with result: ");
    console.log(result.rows);
return result;
  });
  console.log(r);

  pool.query(sql, function (err, result) {

    if (err) {
      console.log("Error in query: ");
      console.log(err);
    }
    console.log("Back from DB with result: ");
    console.log(result.rows);

    var results = result.rows;
    var html = '<section class="characterView">';
    for (i in results) {
      for (j in results[i]) {
        //dont print out the id
        if (j == 'name') {
          html += '<section class="characterHeader">' +
            '<h1 id="characterName">' + results[i][j] + '</h1>';
        } else if (j == 'class') {
          html += '<section class="characterCS">' +
            '<span class="characterCS">' + results[i][j] + '</span>';
        } else if (j == 'species') {
          html += '<span class="characterCS">' + results[i][j] + '</span>' +
            '</section></section>'; //close characterHeader and characterCS

        } else if (j == 'gear_id') {
          var sqlGear = "SELECT * FROM gear WHERE gear.id = " + results[i][j];

           var test = pool.query(sqlGear, function (err, gear) {

            if (err) {
              console.log("Error in query: ");
              console.log(err);
            }
            console.log("Back from DB with result: ");
            console.log(gear.rows);

            var resultsGear = gear.rows;
            for (g in resultsGear) {
              for (gr in resultsGear[g]) {
                if (gr == 'weapon') {
                  html += '<section id="characterGear">' +
                    '<span class="characterGear">' + resultsGear[g][gr] + '</span>';
                } else if (gr == 'armor') {
                  html += '<span class="characterGear">' + resultsGear[g][gr] + '</span>' +
                    '</section>'; //close characterGear
                }

              }
            }
            return html;
          });
          console.log(test);
        } else if (j == 'stats_id') {
          console.log(html);
          var sqlStats = "SELECT * FROM stats WHERE stats.id = " + results[i][j];
          pool.query(sqlStats, function (err, stats) {

            if (err) {
              console.log("Error in query: ");
              console.log(err);
            }
            console.log("Back from DB with result: ");
            console.log(stats.rows);

            var resultsStats = stats.rows;
            for (s in resultsStats) {
              for (sr in resultsStats[g]) {
                if (sr == 'strength') {
                  html += '<section id="characterStats">' +
                    '<span class="characterStat">' + resultsStats[s][sr] + '</span>';
                } else if (sr == 'agility') {
                  html += '<span class="characterStat">' + resultsStats[s][sr] + '</span>';
                } else if (sr == 'wisdom') {
                  html += '<span class="characterStat">' + resultsStats[s][sr] + '</span>';
                } else if (sr == 'intelligence') {
                  html += '<span class="characterStat">' + resultsStats[s][sr] + '</span>' +
                    '</section>'; //close characterStats
                }

              }
            }
          });
        } else if (j == 'backstory') {
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
});
app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.get('/', (req, res) => res.render('pages/index'));
app.listen(PORT, () => console.log(`Listening on ${ PORT }`));