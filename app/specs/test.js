// For authoring Nightwatch tests, see
// http://nightwatchjs.org/guide#usage

module.exports = {
  'default e2e tests': function (browser) {
    // automatically uses dev Server port from /config.index.js
    // default: http://localhost:8080
    // see nightwatch.conf.js
    const devServer = browser.globals.devServerURL
    let isAddLastMonth = false
    let wbs = ''
    if (browser.globals.splitetime > 1 && browser.globals.splitetime < 31) {
      isAddLastMonth = true
    }

    browser
      .url(devServer).verify.login()
      .url('https://e-cology.beyondsoft.com/workflow/request/AddRequest.jsp?workflowid=53&isagent=0&beagenter=0&f_weaver_belongto_userid=')
      .waitForElementVisible('#bodyiframe', 5000)
      .frame('bodyiframe')
    if (isAddLastMonth) {
      browser.click('div#div0button > button.addbtn_p')
    }
    browser.click('div#div0button > button.addbtn_p').maximizeWindow()
    // 得到wbs值
    browser.getAttribute('table#oTable0 > tfoot > tr:nth-child(1) > td:nth-child(2) >input[type=hidden]', 'value', function(wbsr) {
      wbs = wbsr.value
    })
    browser.elements('css selector', 'table#oTable0 > tfoot > tr', function(trs) {
      let length = trs.value.length
      if (isAddLastMonth) {
        setWbs(browser, length - 2, wbs)
        browser.getAttribute('css selector', `table#oTable0 > tfoot > tr:nth-child(${length - 2}) > td:nth-child(6) >input[type=hidden]`, 'id', function(timeId) {
          browser.execute(function(id){
            let time = document.getElementById(id).value
            let times = time.split('-')
            times[1] = Number(times[1]) -1
            let lastTime = times.join('-')
            document.getElementById(id).value = lastTime
            document.getElementById(id + 'span').innerText = lastTime
            return true
          }, [timeId.value], function() {
            browser.pause(500)
            browser.elements('css selector', `table#oTable0 > tfoot > tr:nth-child(${length - 2}) > td`, function (tds) {
              let newTds = getLastMonthTimes(tds.value, browser)
              newTds.forEach(tdResult => {
                browser.elementIdElement(tdResult.ELEMENT, 'css selector', 'input[type=text]', function (timeSetInput) {
                  browser.elementIdAttribute(timeSetInput.value.ELEMENT, 'readonly', function(res){
                    if (!res.value) {
                      browser.elementIdValue(timeSetInput.value.ELEMENT, tdResult.time)
                    }
                  })
                })
              })
            })
          })
        })
      }
      setWbs(browser, length - 1, wbs)
      browser.elements('css selector', `table#oTable0 > tfoot > tr:nth-child(${length - 1}) > td`, function (tds) {
        let newTds = getTimes(tds.value, browser)
        newTds.forEach(td => {
          browser.elementIdElement(td.ELEMENT,'css selector', 'input[type=text]', function(timeSetInput){
            browser.elementIdAttribute(timeSetInput.value.ELEMENT, 'readonly', function (res) {
              if (!res.value) {
                browser.elementIdValue(timeSetInput.value.ELEMENT, td.time)
              }
            })
          })
        })
      })
    })
  }
}

function setWbs(browser, index, wbs) {
  browser.getAttribute('css selector', `table#oTable0 > tfoot > tr:nth-child(${index}) > td:nth-child(2) >input[type=hidden]`, 'id', function (id) {
    browser.execute(function (id, wbs) {
      document.getElementById(id).value = wbs
      document.getElementById(id + 'span').innerText = wbs
      return true
    }, [id.value, wbs], null)
  })
}
function getTimes (list, browser) {
  let start = list.length - 31
  let end = list.length -31 + browser.globals.splitetime
  let newList = []
  for (let index = start; index < end; index++) {
    let item = list[index]
    item.time = 8
    item.day = index - start + 1
    newList.push(item)
  }
  browser.globals.holidays.forEach(day => {
    let days = day.split('-')
    if (days[0] <= browser.globals.splitetime) {
      newList[days[0] - 1].time = 8 - days[1]
    }
  })
  return newList
}
function getLastMonthTimes(list, browser) {
  let start = list.length - (31 - browser.globals.splitetime)
  let end = list.length
  let newList = []
  for (let index = start; index < end; index++) {
    let item = list[index]
    item.time = 8
    item.day = index - start + browser.globals.splitetime + 1
    newList.push(item)
  }
  browser.globals.holidays.forEach(day => {
    let days = day.split('-')
    if (days[0] > browser.globals.splitetime) {
      newList[days[0] - 1 - browser.globals.splitetime].time = 8 - days[1]
    }
  })
  return newList
}