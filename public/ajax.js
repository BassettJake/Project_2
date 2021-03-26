$(function () {
  $('#viewCharButton').on('click', viewChars);
});

function viewChars() {
  $.ajax({
    url: '/viewCharacters',
    contentType: 'application/json',
    success: function (res) {

      document.getElementsByTagName("TITLE")[0].textContent = "View Characters";

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
  $('#headingButton').on('click', home);
});

function home() {

  $.ajax({
    url: '/home',
    contentType: 'application/text',
    success: function (res) {
      document.getElementsByTagName("TITLE")[0].textContent = "Home";
      var html = '<button class="button goldButton" id="viewCharButton">View Characters</button>' +
        '<button class="button goldButton" id="createCharButton">Create Character</button>';
      document.getElementById("homeWrapper").innerHTML = html;
      document.getElementById("viewCharButton").addEventListener("click", viewChars);
      document.getElementById("createCharButton").addEventListener("click", createChars);
    }
  });
}

$(function () {
  $('#createCharButton').on('click', createChars);
});

function createChars() {
  $.get(
    '/createChar',
    function (res) {

      var html = res;
      document.getElementsByTagName("html")[0].innerHTML = html;
      document.getElementById("toBackstory").addEventListener("click", toBackstory);
      document.getElementById("viewCharButton").addEventListener("click", viewChars);
      document.getElementById("createCharButton").addEventListener("click", createChars);
      document.getElementById("headingButton").addEventListener("click", home);
    });
}

var CharDetails = {
  name: "",
  species: "",
  class: "",
  backstory: "",
  weapon: "",
  armor: "",
  strength: "",
  agility: "",
  wisdom: "",
  intelligence: ""
};

function setCharDetails(type, param) {
  CharDetails[type] = param;
  if(type == "species"){
    document.getElementById("selectSpecies").textContent = param;
  }
}

function toBackstory() {
  var eleName = document.getElementById("name").value
  var eleClass = CharDetails.class;
  var eleSpecies = CharDetails.species;
  var message = "";
  if(eleName.match("/^[a-z ,.'-]+$/i/g") && eleClass != "" && eleClass != ""){
    setCharDetails("name", eleName);

    $.get(
      '/createNext1',
      function (res) {
        var html = res;
        document.getElementsByTagName("html")[0].innerHTML = html;
        document.getElementById("toStats").addEventListener("click", toStats);
      });
  }
  else{
    if(!(eleName.match("/^[a-z ,.'-]+$/i/g"))){
      message += "Name can only include letters, spaces, commas, apostrophes, periods, and hyphens." + '\n';
    }
    if(eleClass == ""){
      message += "Please select a class.";
    }
    if(eleSpecies == ""){
      message += "Please select a species." + '\n';
    }
    document.getElementById("message").innerHTML = message;
    document.getElementById("message").style.display = "block";

  }
}

function toStats() {
  setCharDetails("backstory", document.getElementById("backstory").value);

  $.get(
    '/createNext2',
    function (res) {
      var html = res;
      document.getElementsByTagName("html")[0].innerHTML = html;
      document.getElementById("toConfirm").addEventListener("click", toConfirm);
    });
}

function toConfirm() {
  setCharDetails("strength", document.getElementById("strength").value);
  setCharDetails("agility", document.getElementById("agility").value);
  setCharDetails("wisdom", document.getElementById("wisdom").value);
  setCharDetails("intelligence", document.getElementById("intelligence").value);

  $.get(
    '/createConfirm',
    function (res) {
      var html = res;
      document.getElementsByTagName("html")[0].innerHTML = html;
      var charHtml = '<ul><li>' + CharDetails.name + '</li><li>' +
        CharDetails.species + '</li><li>' +
        CharDetails.class + '</li><li>' +
        CharDetails.backstory + '</li><li>' +
        CharDetails.weapon + '</li><li>' +
        CharDetails.armor + '</li><li>' +
        CharDetails.strength + '</li><li>' +
        CharDetails.agility + '</li><li>' +
        CharDetails.wisdom + '</li><li>' +
        CharDetails.intelligence + '</li></ul>';


      charHtml += '<form id="postageForm" action="/createCharacter" method="post">' +
        '<input type="hidden" id="cname" name="cname" value="' + CharDetails.name + '">' +
        '<input type="hidden" id="cspecies" name="cspecies" value="' + CharDetails.species + '">' +
        '<input type="hidden" id="cclass" name="cclass" value="' + CharDetails.class + '">' +
        '<input type="hidden" id="cbackstory" name="cbackstory" value="' + CharDetails.backstory + '">' +
        '<input type="hidden" id="cweapon" name="cweapon" value="' + CharDetails.weapon + '">' +
        '<input type="hidden" id="carmor" name="carmor" value="' + CharDetails.armor + '">' +
        '<input type="hidden" id="cstrength" name="cstrength" value="' + CharDetails.strength + '">' +
        '<input type="hidden" id="cagility" name="cagility" value="' + CharDetails.agility + '">' +
        '<input type="hidden" id="cwisdom" name="cwisdom" value="' + CharDetails.wisdom + '">' +
        '<input type="hidden" id="cintelligence" name="cintelligence" value="' + CharDetails.intelligence + '">' +
        '<input id="confirm" type="submit" name="submit" value="Submit">' +
        '</form>';

      document.getElementById("viewCharacter").innerHTML = charHtml;
    });
}