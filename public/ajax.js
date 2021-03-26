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
      document.getElementById("mainWrapper").innerHTML = html;
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
      document.getElementById("mainWrapper").innerHTML = html;
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
  if (type == "species") {
    document.getElementById("selectSpecies").textContent = param;
  } else if (type == "class") {
    document.getElementById("selectClass").textContent = param;
  } else if (type == "weapon") {
    document.getElementById("selectWeapon").textContent = param;
  } else if (type == "armor") {
    document.getElementById("selectArmor").textContent = param;
  }
}

function toBackstory() {
  var eleName = document.getElementById("name").value;
  var eleClass = CharDetails.class;
  var eleSpecies = CharDetails.species;
  var message = "";
  if (eleName.match(/^[a-z ,.'-]+$/gi) && eleClass != "" && eleClass != "") {
    setCharDetails("name", eleName);

    $.get(
      '/createNext1',
      function (res) {
        var html = res;
        document.getElementsByTagName("html")[0].innerHTML = html;
        document.getElementById("toStats").addEventListener("click", toStats);
      });
  } else {
    message += "<ul>";
    if (!(eleName.match(/^[a-z ,.'-]+$/gi))) {
      message += "<li>Name can only include letters, spaces, commas, apostrophes, periods, and hyphens.</li>";
    }
    if (eleClass == "") {
      message += "<li>Please select a class.</li>";
    }
    if (eleSpecies == "") {
      message += "<li>Please select a species.</li>";
    }
    message += "</ul>";
    document.getElementById("message").innerHTML = message;
    document.getElementById("message").style.display = "block";

  }
}

function toStats() {
  var eleBackstory = document.getElementById("backstory").value;
  var message = "";
  //if (eleBackstory.match("/^[a-z ,.'!()-]+$/gi")) {
  setCharDetails("backstory", document.getElementById("backstory").value);

  $.get(
    '/createNext2',
    function (res) {
      var html = res;
      document.getElementsByTagName("html")[0].innerHTML = html;
      document.getElementById("toConfirm").addEventListener("click", toConfirm);
    });
 // } else {
    message += "<ul>";
    if (!(eleBackstory.match("/^[a-z ,.'!()-]+$/gi"))) {
      message += "<li>Backstory can only include letters, spaces, commas, exclaimations, parenthesis, apostrophes, periods, and hyphens.</li>";
    }
    message += "</ul>";
    document.getElementById("message").innerHTML = message;
    document.getElementById("message").style.display = "block";

  //}
}

function toConfirm() {
  var eleStr = document.getElementById("strength").value;
  var eleAgi = document.getElementById("agility").value;
  var eleWis = document.getElementById("wisdom").value;
  var eleInt = document.getElementById("intelligence").value;
  var eleWeapon = CharDetails.weapon;
  var eleArmor = CharDetails.armor;

  if (eleStr != "" && eleAgi != "" && eleWis != "" && eleInt != "" && eleWeapon != "" && eleArmor != "") {
  setCharDetails("strength", document.getElementById("strength").value);
  setCharDetails("agility", document.getElementById("agility").value);
  setCharDetails("wisdom", document.getElementById("wisdom").value);
  setCharDetails("intelligence", document.getElementById("intelligence").value);

  $.get(
    '/createConfirm',
    function (res) {
      var html = res;
      document.getElementsByTagName("html")[0].innerHTML = html;
      var charHtml = '<section class="characterWrapper">';
      charHtml += '<section class="character">';
      charHtml += '<section class="top">';
      charHtml += '<section class="char-name">' + CharDetails.name + '</section>';
      charHtml += '<section class="top-seg">';
      charHtml += '<section class="labelWrap">';
      charHtml += '<section class="label">Species</section>';
      charHtml += '<section class="char-medText char-species">' + CharDetails.species + '</section>';
      charHtml += '</section>';
      charHtml += '<section class="labelWrap">';
      charHtml += '<section class="label">Class</section>';
      charHtml += '<section class="char-medText char-class">' + CharDetails.class + '</section>';
      charHtml += '</section>';
      charHtml += '<section class="labelWrap">';
      charHtml += '<section class="label">Weapon</section>';
      charHtml += '<section class="char-medText char-weapon">' + CharDetails.weapon + '</section>';
      charHtml += '</section>';
      charHtml += '<section class="labelWrap">';
      charHtml += '<section class="label">Armor</section>';
      charHtml += '<section class="char-medText char-armor">' + CharDetails.armor + '</section>';
      charHtml += '</section>';
      charHtml += '</section>';
      charHtml += '</section>';
      charHtml += '<hr>';
      charHtml += '<section class="mid">';
      charHtml += '<section class="labelWrap">';
      charHtml += '<section class="label">Strength</section>';
      charHtml += '<section class="char-medText char-strength">' + CharDetails.strength + '</section>';
      charHtml += '</section>';
      charHtml += '<section class="labelWrap">';
      charHtml += '<section class="label">Agility</section>';
      charHtml += '<section class="char-medText char-agility">' + CharDetails.agility + '</section>';
      charHtml += '</section>';
      charHtml += '<section class="labelWrap">';
      charHtml += '<section class="label">Wisdom</section>';
      charHtml += '<section class="char-medText char-wisdom">' + CharDetails.wisdom + '</section>';
      charHtml += '</section>';
      charHtml += '<section class="labelWrap">';
      charHtml += '<section class="label">Intelligence</section>';
      charHtml += '<section class="char-medText char-intelligence">' + CharDetails.intelligence + '</section>';
      charHtml += '</section>';
      charHtml += '</section>';
      charHtml += '<hr>';
      charHtml += '<section class="bottom">';
      charHtml += '<section class="char-backstory">' + CharDetails.backstory + '</section>';
      charHtml += '</section>';
      charHtml += '</section>';


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
  } else {
    message += "<ul>";
    if (eleStr == "" || eleAgi == "" || eleWis == "" || eleInt == "") {
      message += "<li>Please fill out all stats.</li>";
    }
    if(eleWeapon == ""){
      message += "<li>Please select a weapon.</li>";
    }
    if(eleArmor == ""){
      message += "<li>Please select an armor type.</li>";
    }
    message += "</ul>";
    document.getElementById("message").innerHTML = message;
    document.getElementById("message").style.display = "block";

  }
}