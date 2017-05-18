var totalScore = 0;
function showNextPokemon () {

  $('main').empty();
  $('.right-wrong').empty();

  var randomGen = Math.floor((Math.random() * 151) + 1);
  var newRandom1 = Math.floor((Math.random() * 251) + 1);
  var newRandom2 = Math.floor((Math.random() * 251) + 1);
  var newRandom3 = Math.floor((Math.random() * 251) + 1);

  var pokeName;
  var otherName1;
  var otherName2;
  var otherName3;
  var pokeId;

  var noMain = $('main').empty();
  var noSection = $('section').empty();
  var newMain = $('main')

  const apiRequest = 'https://pokeapi.co/api/v2/pokemon/' + randomGen;
  const newRequest1 = 'https://pokeapi.co/api/v2/pokemon/' + newRandom1
  const newRequest2 = 'https://pokeapi.co/api/v2/pokemon/' + newRandom2
  const newRequest3 = 'https://pokeapi.co/api/v2/pokemon/' + newRandom3
  const spriteRequest = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/' + randomGen + '.png';

  $.get(spriteRequest)

  getPokemon();

  function getPokemon() {
    Promise.all([
      $.get(apiRequest),
      $.get(newRequest1),
      $.get(newRequest2),
      $.get(newRequest3)
    ]).then(function(results) {
      var data = results[0];
      var newData1 = results[1];
      var newData2 = results[2];
      var newData3 = results[3];
      pokeName = data.name;
      pokeId = data.id;
      otherName1 = newData1.name;
      pokeId = newData1.id;
      otherName2 = newData2.name;
      pokeId = newData2.id;
      otherName3 = newData3.name;
      pokeId = newData3.id;
      var buttons = [
        "<button type='button' class='option1'>" + pokeName.toUpperCase() + "</button>",
        "<button type='button' class='incorrect'>" + otherName1.toUpperCase() + "</button>",
        "<button type='button' class='incorrect'>" + otherName2.toUpperCase() + "</button>",
        "<button type='button' class='incorrect'>" + otherName3.toUpperCase() + "</button>"
      ];

      $('main').append("<h3 class='question'>Who's that Pokemon?</h3><img src=" + spriteRequest + " class='sprite'><br>")

      var button1Index = Math.floor(Math.random() * buttons.length);
      $('main').append(buttons[button1Index])
      buttons.splice(button1Index, 1)
      var button2Index = Math.floor(Math.random() * buttons.length);
      $('main').append(buttons[button2Index])
      buttons.splice(button2Index, 1)
      var button3Index = Math.floor(Math.random() * buttons.length);
      $('main').append(buttons[button3Index])
      buttons.splice(button3Index, 1)
      var button4Index = Math.floor(Math.random() * buttons.length);
      $('main').append(buttons[button4Index])

      $('.option1').click(function() {
        $('h3').remove();
        $('h4').remove();
        $('.Next').remove();
        $('.right-wrong').append('<h3>CORRECT!</h3>')
        var nextButton = $('<button type="button" class="Next">Next Question</button>')
        totalScore++
        $('#totalScore').text(totalScore);
        nextButton.click(function() {
          showNextPokemon();
        })
        $('.right-wrong').append(nextButton);
      })

      $('.incorrect').click(function() {
        $('h4').remove();
        $('h3').remove();
        $('.Next').remove();
        $('.right-wrong').append('<h4>Incorrect...</h4>')
        var nextButton = $('<button type="button" class="Next">Next Question</button>')
        nextButton.click(function() {
          showNextPokemon();
        })
        $('.right-wrong').append(nextButton)
      });
    });
  }
  if (totalScore === 10) {
    noMain;
    noSection;
    newMain.append("<h3>You Finished!</h3>");
  }
};

showNextPokemon();
