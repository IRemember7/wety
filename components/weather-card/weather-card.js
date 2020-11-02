// components/weather-card/weather-card.js
Component({
  lifetimes: {
    attached() {
      this.getWeather()
    }
  },

  options: {
    addGlobalClass: true
  },

  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    // 所在城市
    city: "",
    // 获取到的天气信息
    weather: null,
    // 默认天气类别
    weatherClass: '',
    // 未来五日天气显示boolean
    showMoreForecast: false,
  },

  /**
   * 组件的方法列表
   */
  methods: {
    /* 显示未来五日预报 */
    showMoreForecast() {
      this.setData({
        showMoreForecast: !this.data.showMoreForecast
      })
    },
    /* 获取天气信息 */
    getWeather: function() {
      var that = this;
      this.setData({
        city: '广州'
      })

      wx.request({
        url: 'https://api.tianapi.com/txapi/tianqi/index?key=a554ecc0b2ff8cfd379ec41b85c06170&city=' + that.data.city,
        method: 'GET',
        dataType: 'json',
        success: function(res) {
          console.log(res.data.newslist);
          that.setData({
            weather: res.data.newslist
          });
          // /* 设置弹出框内容 */
          // for (var i = 0; i < 5; i++) {
          //   var str1 = 'actions[' + i + '].subname';
          //   var str2 = 'actions[' + i + '].name';
          //   that.setData({
          //     [str1]: that.data.weather.forecast[i].date,
          //     [str2]: '「' + that.data.weather.forecast[i].type + '」' + that.data.weather.forecast[i].low + ' ' + that.data.weather.forecast[i].high
          //   });
          // }
          // console.log(that.data.weather[0].weatherimg )
          if (that.data.weather[0].weatherimg =="qing.png") {
              that.setData({
                'weatherClass': 'sunny'
              });
              // console.log(that.data.weatherClass)
          } else if (that.data.weather[0].weatherimg =='lei.png') {
            that.setData({
              weatherClass: 'stormy'
            });
            // console.log(that.data.weatherClass)
          } else if (that.data.weather[0].weatherimg =='xue.png' || that.data.weather[0].weatherimg =='bingbao.png' ) {
            that.setData({
              weatherClass: 'snowy'
            });
            console.log(that.data.weatherClass)
          } else if (that.data.weather[0].weatherimg =='yu.png') {
            that.setData({
              weatherClass: 'rainy'
            });
            // console.log(that.data.weatherClass)
          } else if (that.data.weather[0].weatherimg =='yin.png' || that.data.weather[0].weatherimg =='yun.png' || that.data.weather[0].weatherimg =='wu.png ' || that.data.weather[0].weatherimg =='shachen.png') {
            that.setData({
              weatherClass: 'cloudy'
            });
            // console.log(that.data.weatherClass)
          }
        }
      })
    },
  }
})