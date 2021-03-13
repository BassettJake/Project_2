$(function () {
  $('#submitButton').on('click', viewChar());
});

function viewChars(){
  console.log("view");
  $.ajax({
    url: '/viewCharacters',
    contentType: 'application/json',
    success: function (res) {
      var html = '<section class="characterWrapper">';
      for (i in res) {
        html += '<section class="character">';
        html += '<section class="top">';
        html += '<section class="char-name">' + res[i]['name'] + '</section>';
        html += '<section class="top-seg">';
        html += '<section class="labelWrap">';
        html += '<section class="label">Species</section>';
        html += '<section class="char-medText char-species">' + res[i]['species'] + '</section>';
        html += '</section>';
        html += '<section class="labelWrap">';
        html += '<section class="label">Class</section>';
        html += '<section class="char-medText char-class">' + res[i]['class'] + '</section>';
        html += '</section>';
        html += '<section class="labelWrap">';
        html += '<section class="label">Weapon</section>';
        html += '<section class="char-medText char-weapon">' + res[i]['weapon'] + '</section>';
        html += '</section>';
        html += '<section class="labelWrap">';
        html += '<section class="label">Armor</section>';
        html += '<section class="char-medText char-armor">' + res[i]['armor'] + '</section>';
        html += '</section>';
        html += '</section>';
        html += '</section>';
        html += '<hr>';
        html += '<section class="mid">';
        html += '<section class="labelWrap">';
        html += '<section class="label">Strength</section>';
        html += '<section class="char-medText char-strength">' + res[i]['strength'] + '</section>';
        html += '</section>';
        html += '<section class="labelWrap">';
        html += '<section class="label">Agility</section>';
        html += '<section class="char-medText char-agility">' + res[i]['agility'] + '</section>';
        html += '</section>';
        html += '<section class="labelWrap">';
        html += '<section class="label">Wisdom</section>';
        html += '<section class="char-medText char-wisdom">' + res[i]['wisdom'] + '</section>';
        html += '</section>';
        html += '<section class="labelWrap">';
        html += '<section class="label">Intelligence</section>';
        html += '<section class="char-medText char-intelligence">' + res[i]['intelligence'] + '</section>';
        html += '</section>';
        html += '</section>';
        html += '<hr>';
        html += '<section class="bottom">';
        html += '<section class="char-backstory">' + res[i]['backstory'] + '</section>';
        html += '</section>';
        html += '</section>';
      }
      html += '</section>';
      document.getElementById("homeWrapper").innerHTML = html;
    }
  });
}

$(function () {
  $('#headingButton').on('click', function () {
    console.log("home");
    $.ajax({
      url: '/home',
      contentType: 'application/text',
      success: function (res) {
        var html = '<button class="button goldButton" id="submitButton">View Characters</button>'
          document.getElementById("homeWrapper").innerHTML = html;
          document.getElementById("submitButton").addEventListener("click", viewChars());
      }
    });
  });
});