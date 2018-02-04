// A custom Nightwatch assertion.
// the name of the method is the filename.
// can be used in tests like this:
//
//   browser.assert.elementCount(selector, count)
//
// for how to write custom assertions see
// http://nightwatchjs.org/guide#writing-custom-assertions
exports.assertion = function () {
  this.message = 'login in'
  this.expected = true
  this.pass = function (val) {
    return val === this.expected
  }
  this.value = function (res) {
    return res
  }
  this.command = function (cb) {
    var self = this
    self.api.waitForElementVisible('#g_loginform', 5000)
    self.api.setValue('input#loginid[type=text]', self.api.globals.login)
    self.api.setValue('input#passwords[type=password]', self.api.globals.pwd)
    self.api.click('input#BtnLogin')
      .waitForElementVisible('#container', 5000)
    return () => {
      cb.call(self, true)
    }
  }
}
