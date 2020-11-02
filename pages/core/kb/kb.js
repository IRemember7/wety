//kb.js
//获取应用实例
var app = getApp();
var util = require('../../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    colorArrays: ['#f5c57d', '#d4a1e5', '#75a0de', '#df6b9e', '#b9d58e', '#87cdd0'],
    wlist: null,
    remind: '加载中',
    optime: '2019/08/26',
    week: '',
    shows: false,
    classitem: '',
    nowxq: '',
    touch_x:'',
    touch_y:'',
  },

  //获取上周课表
  lastclass: function (e) {
    // console.log(e),
    this.setData({
      'week': this.data.week - 1,
    })
  },
  //获取本周课表
  nowclass: function (e) {
    // console.log(e),
    this.setData({
      'week': app._week,
    })
  },
  //获取下周课表
  nextclass: function (e) {
    // console.log(e),
    this.setData({
      'week': this.data.week + 1,
    })
  },
  touchStart(e) {
    // console.log(e)
    this.setData({
      "touch_x": e.changedTouches[0].clientX,
      "touch_y": e.changedTouches[0].clientY
    });
  },
  touchEnd(e) {
    var _this = this;
    let x = e.changedTouches[0].clientX;
    let y = e.changedTouches[0].clientY;
      if (x - _this.data.touch_x > 50 && Math.abs(y - _this.data.touch_y) < 50) {      //右滑
        // 上周课表
        _this.lastclass()
        
      } else if (x - _this.data.touch_x < -50 && Math.abs(y - _this.data.touch_y) < 50) {   //左滑
        // 下周课表
        _this.nextclass()
      }
  },
  click: function (e) {
    // console.log(e)
    this.setData({
      classitem: e.currentTarget.dataset['index'],
      shows: true,
    })
  },
  // 点击遮罩层，显示的遮罩层与面板又隐藏起来
  close: function () {
    this.setData({
      shows: false,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var _this = this;
    if (!app._user.we.id || !app._user.we.name) {
      _this.setData({
        remind: '未绑定'
      });
      return false;
    }
    var today = new Date().getDay();
    switch (today) {
      case 0:
        _this.setData({
          nowxq: '日'
        });
        break;
      case 1:
        _this.setData({
          nowxq: '一'
        });
        break;
      case 2:
        _this.setData({
          nowxq: '二'
        });
        break;
      case 3:
        _this.setData({
          nowxq: '三'
        });
        break;
      case 4:
        _this.setData({
          nowxq: '四'
        });
        break;
      case 5:
        _this.setData({
          nowxq: '五'
        });
        break;
      case 6:
        _this.setData({
          nowxq: '六'
        });
        break;
    }
    _this.setData({
      'week': app._week,
      'wlist': app._user.kb,
      'remind': ''
    });

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    var _this = this;
    wx.request({
      url: app._server + '/wety/getRefreshKb',
      method: "POST",
      header: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      data: {
        userid: app._user.we.id,
        passwd: app._user.we.passwd,
      },
      success: function (res) {
        // console.log(res.data)
        wx.stopPullDownRefresh()
        wx.showToast({
          title: '更新成功', // 标题
          icon: 'success',  // 图标类型，默认success
          duration: 1000  // 提示窗停留时间，默认1500ms
        })
        _this.setData({
          'wlist':res.data
        })
        app._user.kb = res.data
        wx.setStorage({
          data: res.data,
          key: 'kb',
        })
      },
      fail: function (res) {
        console.log(res)
      }
    })
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})