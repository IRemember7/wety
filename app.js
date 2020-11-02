//app.js
var util=require('./utils/util')
App({
  version: 'v3.0.2', //版本号
  onLaunch: function () {
    var _this = this;
    //读取缓存
    try {
      var data = wx.getStorageInfoSync();
      if (data && data.keys.length) {
        data.keys.forEach(function (key) {
          var value = wx.getStorageSync(key);
          if (value) {
            _this.cache[key] = value;
          }
        });
        // console.log(_this.cache)
        if(_this.cache){
          _this._user.wx.tmryj =_this.cache.tmryj,
          _this._user.wx.mryj_data = _this.cache.mryj_data,
          _this._user.wx.lsjt_data = _this.cache.lsjt_data,
          _this._user.wx.openid = _this.cache.openid,
          _this._user.we= _this.cache.user,
          _this._user.kb = _this.cache.kb,
          _this._user.ks = _this.cache.ks,
          _this._user.cj = _this.cache.cj,
          _this._user.xf = _this.cache.xf
        }
        console.log(_this._user.we.version)
        if (_this._user.we.version !== _this.version) {
          _this.cache = {};
          _this._user.wx={};
          _this._user.we={};
          _this._user.kb=[];
          _this._user.ks=[];
          _this._user.cj=[];
          _this._user.xf=[];
          wx.clearStorage();
        }
      }
    } catch (e) 
    { console.warn('获取缓存失败'); }

    var date = util.formatTime(new Date());
    var week = util.checkDate(_this.optime,date);
    _this._week = week;
    var today = new Date().getDay();
    if (today != 0) {
      _this._day = today
    }
  },
  //保存缓存
  // saveCache: function (key, value) {
  //   if (!key || !value) { return; }
  //   var _this = this;
  //   _this.cache[key] = value;
  //   wx.setStorage({
  //     key: key,
  //     data: value
  //   });
  // },
  //清除缓存
  removeCache: function (key) {
    if (!key) { return; }
    var _this = this;
    _this.cache[key] = '';
    wx.removeStorage({
      key: key
    });
  },
  //后台切换至前台时
  onShow: function () {

  },
  //判断是否有登录信息，让分享时自动登录
  loginLoad: function (onLoad) {
    var _this = this;
    if (!_this._t) {  //无登录信息
      _this.getUser(function (e) {
        typeof onLoad == "function" && onLoad(e);
      });
    } else {  //有登录信息
      typeof onLoad == "function" && onLoad();
    }
  },

  showErrorModal: function (content, title) {
    wx.showModal({
      title: title || '加载失败',
      content: content || '未知错误',
      showCancel: false
    });
  },
  showLoadToast: function (title, duration) {
    wx.showToast({
      title: title || '加载中',
      icon: 'loading',
      mask: true,
      duration: duration || 1000
    });
  },
  key: function (data) { return this.util.key(data) },
  enCodeBase64: function (data) { return this.util.base64.encode(data) },
  cache: {},
  newsItem:{},
  _server: 'https://www.wety.top',
  // _server: 'http://localhost:8080',
  // _server: 'http://jwgl.thxy.cn',
  _user: {
    //微信数据
    wx: {},
    //学生\数据
    we: {},
    kb:[],
    xf:[],
    cj:[],
    ks:[]
  },
  _week:'', //当前学期周数
  _day:'7',//今天星期几
  optime:'2020/09/07'
});