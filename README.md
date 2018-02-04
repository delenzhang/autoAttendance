## 基于A公司的考勤系统的一套自动录入的方案

### 配置
在```nightwatch.conf.js```中
````
globals: {
        devServerURL: 'https://e-cology.beyondsoft.com/login/Login.jsp?logintype=1', //这是网站地址，你懂得
        login: '',//你的帐号
        pwd: '',// 你的密码
        splitetime: 25, //这个为了防止考勤定为其他时间，目前暂时是25，不用动
        holidays: ['1-4', '25-6','26-4', '30-4', '31-7'] //这里是你请假的时间，记住是你请假的时间，不是上班的时间
                  // 1-4是固定格式 1表示考勤周期的1号，4表示请假的时间
      }
````
配置好后，可以启动运行了！

####启动方式
````
npm i /cnpm i
npm run e2e
````
你的考勤就会自动录入，最后一步是确定，这个还是需要你自己再次确定一次再点击按钮。

####欢迎star和提问