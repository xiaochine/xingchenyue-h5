//app.js
App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        console.log('登錄信息');
        console.log( this.globalData.api_href);
        var _this = this;
        wx.request({
          url: this.globalData.api_href, //仅为示例，并非真实的接口地址
          data: {
            action: "login",
            js_code: res.code

          },
          header: {
            'content-type': 'application/json' // 默认值
          },
          success(res) {
            console.log('登录结果');
            if(res.data.code == 0){
              //成功
              _this.globalData.s_token = res.data.token;
            }
            _this.globalData.session_key = res.data.data.session_key;
            _this.globalData.open_id = res.data.data.open_id;
            console.log(_this.globalData.open_id)
          }
        })
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  globalData: {
    userInfo: null,
    api_href: "http://192.168.7.25:88/api/do",
    s_token: "",
    open_id:"",
    session_key:"",
    title: "星辰月诗词",
    logo: "https://xingchenyue.oss-cn-hangzhou.aliyuncs.com/system/timg.jpg"
  }
})