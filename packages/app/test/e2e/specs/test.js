// For authoring Nightwatch tests, see
// http://nightwatchjs.org/guide#usage

module.exports = {
  'enter app': function (browser) {
    // automatically uses dev Server port from /config.index.js
    // default: http://localhost:8080
    // see nightwatch.conf.js
    const devServer = browser.globals.devServerURL

    browser
      .url(devServer)
      .waitForElementVisible('#app', 5000)
      .assert.elementPresent('.mu-appbar')
  },

  '404 page': function (browser) {
    const devServer = browser.globals.devServerURL
    browser.url(`${devServer}/foo`);
    browser.expect.element('h1').text.to.equal('404 not found')
    browser.end()
  },

  'humidity': function (browser) {
    const devServer = browser.globals.devServerURL
    browser.url(`${devServer}`).pause(1000)
    browser.expect.element('#humidity').text.to.match(/Humidity [0-9]+/g)
  }
}
