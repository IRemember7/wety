//login.js
//获取应用实例
var app = getApp();
Page({
  data: {
    remind: '加载中',
    help_status: false,
    userid_focus: false,
    passwd_focus: false,
    userid: '',
    passwd: '',
    angle: 0,
    timeout1: '',
    timeout2: '',
  },
  onLoad: function () {
    var _this = this;
    _this.data.timeout1 = setTimeout(function () {
      _this.setData({
        remind: '',
      });
    }, 1000);
    wx.onAccelerometerChange(function (res) {
      var angle = -(res.x * 30).toFixed(1);
      if (angle > 14) {
        angle = 14;
      } else if (angle < -14) {
        angle = -14;
      }
      if (_this.data.angle !== angle) {
        _this.setData({
          angle: angle
        });
      }
    });
  },
  onShow: function () {
    wx.startAccelerometer();
  },

  onReady: function () {
    var _this = this;
  },
  onHide: function () {
    var _this = this;
    wx.stopAccelerometer();
  },
  doLogin: function (e) {
    var _this = this;
    if (!_this.data.userid || !_this.data.passwd) {
      app.showErrorModal('账号及密码不能为空', '提醒');
      return false;
    }
    app.showLoadToast('绑定中');
    wx.showNavigationBarLoading();
    wx.showLoading({
      title: '加载中',
    })
    wx.request({
      url: app._server + '/wety/login',
      method: "POST",
      header: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      data: {
        avatarUrl: e.detail.userInfo.avatarUrl,
        nickName: e.detail.userInfo.nickName,
        userid: _this.data.userid,
        passwd: _this.data.passwd,
      },
      success: function (res) {
        wx.hideToast();
        console.log(res.data)
        if (res.data.status == 'y') {
          //清除缓存
          wx.clearStorage();
          app._user.is_bind = true;

          // 加载用户信息
          app._user.we = {
            id: _this.data.userid,
            name: res.data.name,
            grade: res.data.grade,
            major: res.data.major,
            college: res.data.college,
            version: app.version,
            passwd: _this.data.passwd
          }
          // 加载课表
          app._user.kb = res.data.kb
          // 加载考试信息
          app._user.ks = res.data.ks
          //加载成绩信息
          app._user.cj = res.data.cj
          // 学分查询
          app._user.xf = {
            tjmc1: res.data.xf.tjmc1,
            tjz1: res.data.xf.tjz1,
            tjz3: res.data.xf.tjz3,
            tjz2: res.data.xf.tjz2,
          }
          // 保存缓存
          try {
            wx.setStorage({
              data: app._user.we,
              key: 'user',
            })
            wx.setStorage({
              data: app._user.cj,
              key: 'cj',
            })
            wx.setStorage({
              data: app._user.kb,
              key: 'kb',
            })
            wx.setStorage({
              data: app._user.ks,
              key: 'ks',
            })
            wx.setStorage({
              data: app._user.xf,
              key: 'xf',
            })
            // wx.setStorageSync('user', app._user.we)
            // wx.setStorageSync('cj', app._user.cj)
            // wx.setStorageSync('kb', app._user.kb)
            // wx.setStorageSync('ks', app._user.ks)
            // wx.setStorageSync('xf', app._user.xf)
          } catch (e) {
            console.log(e);
          }
          console.log(wx.getStorageSync('user'))
          _this.setData({
            remind: ''
          });
          wx.switchTab({
            url: '/pages/index/index'
          })
        } else {
          wx.hideToast();
          app.showErrorModal(res.data.msg, '错误原因:');
        }
      },
      fail: function (res) {
        wx.hideToast();
        console.log(res)
        app.showErrorModal('请检查网络', '服务器连接失败!');
      },
      complete: function () {
        wx.hideNavigationBarLoading();
      }

    })
  },
  useridInput: function (e) {
    this.setData({
      userid: e.detail.value
    });
    if (e.detail.value.length >= 14) {
      wx.hideKeyboard();
    }
  },
  passwdInput: function (e) {
    this.setData({
      passwd: e.detail.value
    });
  },
  inputFocus: function (e) {
    if (e.target.id == 'userid') {
      this.setData({
        'userid_focus': true
      });
    } else if (e.target.id == 'passwd') {
      this.setData({
        'passwd_focus': true
      });
    }
  },
  inputBlur: function (e) {
    if (e.target.id == 'userid') {
      this.setData({
        'userid_focus': false
      });
    } else if (e.target.id == 'passwd') {
      this.setData({
        'passwd_focus': false
      });
    }
  },
  tapHelp: function (e) {
    if (e.target.id == 'help') {
      this.hideHelp();
    }
  },
  showHelp: function (e) {
    this.setData({
      'help_status': true
    });
  },
  hideHelp: function (e) {
    this.setData({
      'help_status': false
    });
  },
  onUnload() {
    clearTimeout(this.data.timeout1)
    clearTimeout(this.data.timeout2)
  }
});