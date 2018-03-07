$(document).ready(() => {
  let totalScore = 0;
  const showNextPokemon = () => {
    $('.buttons').empty();
    $('.right-wrong').empty();

    const randomGen = Math.floor((Math.random() * 151) + 1);
    const newRandom1 = Math.floor((Math.random() * 151) + 1);
    const newRandom2 = Math.floor((Math.random() * 151) + 1);
    const newRandom3 = Math.floor((Math.random() * 151) + 1);
    
    let pokeName;
    let otherName1;
    let otherName2;
    let otherName3;
    let pokeId;

    const noMain = $('main').empty();
    const noSection = $('section').empty();
    const newMain = $('main');
    const apiRequest = `https://pokeapi.co/api/v2/pokemon/${randomGen}`;
    const newRequest1 = `https://pokeapi.co/api/v2/pokemon/${newRandom1}`;
    const newRequest2 = `https://pokeapi.co/api/v2/pokemon/${newRandom2}`;
    const newRequest3 = `https://pokeapi.co/api/v2/pokemon/${newRandom3}`;
    const spriteRequest = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${randomGen}.png`;

    $.get(spriteRequest);

    const getPokemon = () => {
      Promise.all([
        $.get(apiRequest),
        $.get(newRequest1),
        $.get(newRequest2),
        $.get(newRequest3)
      ])
      .then(results => {
          let data = results[0];
          let newData1 = results[1];
          let newData2 = results[2];
          let newData3 = results[3];
          pokeName = data.name;
          pokeId = data.id;
          otherName1 = newData1.name;
          pokeId = newData1.id;
          otherName2 = newData2.name;
          pokeId = newData2.id;
          otherName3 = newData3.name;
          pokeId = newData3.id;
          let firstName = pokeName.toUpperCase();
          let secondName = otherName1.toUpperCase();
          let thirdName = otherName2.toUpperCase();
          let fourthName = otherName3.toUpperCase();
          const buttons = [
            `<button type='button' class='correct'>${firstName}</button>`,
            `<button type='button' class='correct'>${secondName}</button>`,
            `<button type='button' class='correct'>${thirdName}</button>`,
            `<button type='button' class='correct'>${fourthName}</button>`
          ];
        if (totalScore < 10) {
          $(document).ready(() => {
            $('#loader').hide();
          });
          let question = "Who's that Pokemon?";
          let spriteCall = spriteRequest;
          $('main').append(`<h3 class='question'>${question}</h3><img src=${spriteCall} class='sprite'><br>`);
          const button1Index = Math.floor(Math.random() * buttons.length);
          $('.buttons').append(buttons[button1Index])
          buttons.splice(button1Index, 1);
          const button2Index = Math.floor(Math.random() * buttons.length);
          $('.buttons').append(buttons[button2Index])
          buttons.splice(button2Index, 1);
          const button3Index = Math.floor(Math.random() * buttons.length);
          $('.buttons').append(buttons[button3Index])
          buttons.splice(button3Index, 1);
          const button4Index = Math.floor(Math.random() * buttons.length);
          $('.buttons').append(buttons[button4Index]);
          $('.correct').click(() => {
            $('h3').remove();
            $('h4').remove();
            $('.Next').remove();
            $('.right-wrong').append('<h3>CORRECT!</h3>')
            const nextButton = $('<button type="button" class="Next">Next Question</button>');
            totalScore ++;
            $('#totalScore').text(totalScore);
            nextButton.click(() => {
              $('#loader').show();
              showNextPokemon();
            });
            $('.right-wrong').append(nextButton);
          });
          $('.incorrect').click(() => {
            $('h4').remove();
            $('h3').remove();
            $('.Next').remove();
            $('.right-wrong').append('<h4>Incorrect...</h4>')
            const nextButton = $('<button type="button" class="Next">Next Question</button>')
            nextButton.click(() => {
              $('#loader').show();
              showNextPokemon();
            })
            $('.right-wrong').append(nextButton)
          });
        } else {
          noMain;
          noSection;
          newMain.append("<h3>You Finished!</h3>");
        }
      })
    }
    getPokemon();
  };
  showNextPokemon();
});