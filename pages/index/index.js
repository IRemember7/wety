//index.js
//获取应用实例
var app = getApp();
var util = require('../../utils/util.js');
Page({
  data: {
    remind: '加载中',
    core: [
      { id: 'kb', name: '课表查询', disabled: false},
      { id: 'cj', name: '成绩查询', disabled: false},
      { id: 'ks', name: '考试安排', disabled: false},
      { id: 'xl', name: '校园日历', disabled: false},
      { id: 'bx', name: '故障报修', disabled: false},
      { id: 'pj', name: '一键评教', disabled: false},
    ],
    card: {
      'xf':{
        show: false,
        data: {
        }
      },
      'mryj':{
        show : false,
        data : {}
      },
      'kb': {
        show: false,
        data: {},
        nothing : false,
      }
    },
    todayclass: [],
    xqj:'',
    week:'',
    lsdata:'',
    user: {},
    disabledItemTap: false, //点击了不可用的页面
    // msgList: ["公告：只有教务管理开放的时候才可使用", "公告：请大家多多的谅解", "公告：如果有一些想法可以发邮件到997918253@qq.com"]
  },
  // 更新每日一句
  mryj_update:function(){
    var _this = this;
    // 获取当前时间
    var date = util.formatTime(new Date());
    // 检查时间是否相同
    // 判断相同不操作，不相同获取时间
    if(app._user.wx.tmryj !=date){
    // 不相同 更新每日一句
      wx.request({
        url: 'https://api.tianapi.com/txapi/everyday/index?key=a554ecc0b2ff8cfd379ec41b85c06170',
        success: function (res) {
          if (res.data.code == 200) {
            _this.setData({
              'card.mryj.data': res.data.newslist[0]
            })
            wx.setStorageSync('tmryj', date)
            wx.setStorageSync('mryj_data', res.data.newslist[0])
          }
        }
      })
    }
  },
  //下拉更新
  onPullDownRefresh: function () {
    if (app._user.is_bind) {
      var _this = this;
      _this.setData({
        todayclass:[]
      })
      _this.getCardData();
    }
  },
  onShow: function () {
    var _this = this;
    if (!app._user.we.id || !app._user.we.name) {
      _this.setData({
        remind: '未绑定'
      });
    }else{
      _this.getCardData()
      }
  },
  onLoad: function () {
    var _this = this;
    var date2 = util.formatTime2(new Date());
    _this.setData({
      lsdata:date2,
      xqj:app._day,
      week:app._week,
    })
    if (app._user.we.id || app._user.we.name) {
      _this.setData({
        'remind': '',
        user: app._user,
        'card.kb.show': true,
        'card.mryj.show': true,
        'card.xf.show': true
      });
      var date = util.formatTime(new Date());
      if (app._user.wx.tmryj == date){
        _this.setData({
          'card.mryj.data': app._user.wx.mryj_data,

        })
      }else{
        _this.mryj_update();
      }
    } else {
      _this.setData({
        'remind': '未绑定'
      });
      // _this.getCardData();
    }
    _this.getCardData();
  },
  response: function () { //判断绑定状态
    var _this = this;
    _this.setData({
      user: app._user
    });
    //判断绑定状态
    if (!app._user.is_bind) {
      _this.setData({
        'remind': '未绑定'
      });
    } else {
      _this.setData({
        'remind': '加载中'
      });
      _this.getCardData();
    }
  },
  disabled_item: function () {
    var _this = this;
    if (!_this.data.disabledItemTap) {
      _this.setData({
        disabledItemTap: true
      });
      var timename =setTimeout(function () {
        _this.setData({
          disabledItemTap: false
        });
      }, 2000);

      clearTimeout(timename)
    }
  },
  // 简单排序--冒泡排序
  sort: function(){
    var _this = this;
    var list = _this.data.todayclass;
    for(var i=0;i<list.length;i++)
      for(var j=0;j<list.length-i-1;j++){
        if (list[j].jcdm > list[j+1].jcdm){
          var temp = list[j];
          list[j] =list[j+1];
          list[j+1] =temp;
        }
      } 
    // console.log(_this.data.todayclass)
  },
  gettodayclass:function(){
    var _this = this;
    var zc = _this.data.week;
    var xq = _this.data.xqj;
    _this.setData({
      todayclass:[]
    })
    // var xq = 3;
    // console.log(_this.data.card.kb.data)
    if (_this.data.card.kb.data != '{}') {
      // 查找今日课表
      if (_this.data.todayclass) {
        _this.data.card.kb.data.forEach(function (item, index) {
          if (item.zc == zc && item.xq == xq) {
            _this.setData({
              todayclass: _this.data.todayclass.concat(item)
            })
          }
        })
      }
    }
  },
  getCardData: function () {
    var _this = this;
    if (!app._user.we.id || !app._user.we.name) {
      _this.setData({
        remind: '未绑定'
      });
      return false;
    }
    var date = util.formatTime(new Date());
    if (app._user.wx.tmryj == date) {
      _this.setData({
        'card.mryj.data': app._user.wx.mryj_data,
      })
    } else {
      _this.mryj_update();
    }
    _this.setData({
      'card.xf.data':app._user.xf,
      'card.kb.data': app._user.kb,
      'card.kb.show': true,
      'remind': '',
      'card.mryj.show': true,
      'card.xf.show': true
    })
    _this.gettodayclass()
      // 课表排序
      _this.sort()
      if (_this.data.todayclass.length == 0) {
        _this.setData({
          'card.kb.nothing': true,
      })
      }
    
  },
  onShareAppMessage:function(){
    
  },
  onPullDownRefresh: function () {
    var _this = this;
    wx.request({
      url: app._server + '/wety/getRefreshAll',
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
          "card.xf.data":res.data.xf,
          "card.kb.data":res.data.kb
        })
        // 保存缓存
        try {
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
        } catch (e) {
          console.log(e);
        }
      },
      fail: function (res) {
        console.log(res)
      }
    })
  },
});
