$(document).ready(function() {

  const apiRequest = 'https://pokeapi.co/api/v2/pokemon/'
  var pokeId;

  $.get(apiRequest, function (idSearch) {
    for (let i = 0; i < idSearch.forms.length; i++) {
      pokeId = idSearch.forms[0].id
    }
  }

  const spriteRequest = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/' + pokeId + '.png';

  $('.searchButton').click(function newClick() {
    var value = $('input[name = "search"]').val();
    var finalRequest = apiRequest + pokeId;
    $.get(finalRequest, function(data) {
      $('.resultList').remove();
      for (let i = 0; i < data.forms.length; i++) {
        let sprite = spriteRequest;
        let pokeName = data.forms[0].name;
        let pokeType = data.forms[0].types;
        if (data.forms[0].name) {
          $('.results').append('<ul class="resultList">' + "<li>" + sprite + "</li>" + "<li>" + pokeName + "</li>" + "<li>" + pokeType + "</li></ul>")
        }
      };
    });
  });
});
