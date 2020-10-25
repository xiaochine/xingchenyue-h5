//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    visible1: false,
    title: app.globalData.title,
    logo: app.globalData.logo,
    current: "五言",
    type: "藏头",
    rhyme: "双句一压",
    visible5: false,
    poetry_res: "",
    loading:false,
    actions5: [{
        name: '重新生成',
        color: '#2d8cf0',
        loading: false
      },
      {
        name: '取消',

      }
    ]
  },
  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        //console.log(res.userInfo);
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function (e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  handleMobileClose: function (e) {
    this.setData({
      visible1: false
    })
  },
  handleMobileOK: function (e) {
    wx.showToast({
      title: '操作成功！', // 标题
      icon: 'success', // 图标类型，默认success
      duration: 1500 // 提示窗停留时间，默认1500ms
    })
  },
  /**
   * 点赞
   */
  praise: function (e) {
    if (!app.globalData.userInfo) {
      //需要登录
      wx.navigateTo({
        url: '../login/login'
      })
    } else {
      //调用点赞接口
    }
  },
  handleClick: function (e) {
    console.log(e);
    var _this = this;
    if(_this.data.loading == true){
      return;
    }
    console.log(123);
    _this.setData({
     loading:true
    });
    wx.request({
      url: app.globalData.api_href, //仅为示例，并非真实的接口地址
      data: {
        action: "get_poetry_res",
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        console.log('结果');
        if (res.data.code == 0) {
          _this.setData({
            poetry_res: res.data.data,
            visible5: true
          });
        }
        _this.setData({
          loading:false
        });
      }
    })

  },
  handleClick5({
    detail
  }) {
    console.log(detail);
    if (detail.index === 0) {
      var _this = this;
      wx.request({
        url: app.globalData.api_href, //仅为示例，并非真实的接口地址
        data: {
          action: "get_poetry_res",
        },
        header: {
          'content-type': 'application/json' // 默认值
        },
        success(res) {
          console.log('结果');
          if (res.data.code == 0) {
            _this.setData({
              poetry_res: res.data.data,
              visible5: true
            });
          }
          _this.setData({
            loading:false
          });
        }
      })
    } else {
      this.setData({
        visible5: false
      });
      const action = [...this.data.actions5];
      action[1].loading = true;

      this.setData({
        actions5: action
      });

      setTimeout(() => {
        action[1].loading = false;
        this.setData({
          visible5: false,
          actions5: action
        });
        $Message({
          content: '删除成功！',
          type: 'success'
        });
      }, 2000);
    }
  },
  handleCountChange({
    detail = {}
  }) {
    console.log(detail);
    this.setData({
      current: detail.value
    });
  },
  handleTypeChange({
    detail = {}
  }) {
    console.log(detail);
    this.setData({
      type: detail.value
    });
  },
  handleTypeChange({
    detail = {}
  }) {
    console.log(detail);
    this.setData({
      type: detail.value
    });
  },
  handleRhymChange({
    detail = {}
  }) {
    console.log(detail);
    this.setData({
      rhyme: detail.value
    });
  },
})