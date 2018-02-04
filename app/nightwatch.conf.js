require('babel-register')
// http://nightwatchjs.org/gettingstarted#settings-file
module.exports = {
  src_folders: ['app/specs'],
  output_folder: 'app/reports',
  custom_assertions_path: ['app/custom-assertions'],

  selenium: {
    start_process: true,
    server_path: require('selenium-server').path,
    host: '127.0.0.1',
    port: 4444,
    cli_args: {
      'webdriver.chrome.driver': require('chromedriver').path
    }
  },

  test_settings: {
    default: {
      selenium_port: 4444,
      selenium_host: '127.0.0.1',
      silent: true,
      globals: {
        devServerURL: 'https://e-cology.beyondsoft.com/login/Login.jsp?logintype=1',
        login: 'zhangdailong',
        pwd: '',
        splitetime: 25,
        holidays: ['1-4', '25-6','26-4', '30-4', '31-7']
      }
    },

    chrome: {
      desiredCapabilities: {
        browserName: 'chrome',
        javascriptEnabled: true,
        acceptSslCerts: true
      }
    },

    firefox: {
      desiredCapabilities: {
        browserName: 'firefox',
        javascriptEnabled: true,
        acceptSslCerts: true
      }
    }
  }
}
