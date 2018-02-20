module.exports = {
  'Index test' : function (browser) {
    browser
      .url('http://localhost:8080/index.html')
      .waitForElementVisible('body', 1000)
      .assert.containsText('h1', 'Welcome to PokeTrivia!')
      .end();
  },
  'Index test 2' : function (browser) {
    browser
      .url('http://localhost:8080/triviaCards.html')
      .waitForElementVisible('body', 1000)
      .click('.correct')
      .end();
  }
};
