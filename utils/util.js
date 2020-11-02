//格式化时间
function formatTime(date, t) {
  var year = date.getFullYear();
  var month = date.getMonth() + 1;
  var day = date.getDate();
  // var hour = date.getHours();
  // var minute = date.getMinutes();
  // var second = date.getSeconds();
  if(t === 'h:m') { return [hour, minute].map(formatNumber).join(':'); }
  else { return [year, month, day].map(formatNumber).join('/') 
  // + ' ' + [hour, minute, second].map(formatNumber).join(':'); 
  }
}
function formatTime2(date, t) {
  var month = date.getMonth() + 1;
  var day = date.getDate();
  // var hour = date.getHours();
  // var minute = date.getMinutes();
  // var second = date.getSeconds();
  if (t === 'h:m') { return [hour, minute].map(formatNumber).join(':'); }
  else {
    return [month, day].map(formatNumber).join('')
    // + ' ' + [hour, minute, second].map(formatNumber).join(':'); 
  }
}


function formatNumber(n) {
  n = n.toString();
  return n[1] ? n : '0' + n;
}

//判断是否为纯粹对象
function isPlainObject(obj){
    if(!obj || obj.toString() !== "[object Object]" || obj.nodeType || obj.setInterval){
        return false;
    }
    if(obj.constructor && !obj.hasOwnProperty("constructor") && !obj.constructor.prototype.hasOwnProperty("isPrototypeOf")){
        return false;
    }
    for(var key in obj){}
    return key === undefined || obj.hasOwnProperty(key);
}
function cloneObj(obj){
    if(!isPlainObject(obj)){ return false; }
    return JSON.parse(JSON.stringify(obj));
}

//md5&base64
var md5 = require('md5.min.js'), base64 = require('base64.min.js'),
sign = function(data) {
  var _data = cloneObj(data);
  _data['\x74\x6f\x6b\x65\x6e'] = base64.decode(getApp()['\x5f\x74']);
  return md5(JSON.stringify(_data));
},
key = function(data) {
  if(!isPlainObject(data)){ return false; }
  data.timestamp = parseInt(new Date().getTime().toString().substr(0,10));
  data.sign = sign(data);
  return {
    key: base64.encode(JSON.stringify(data))
  };
}
// 计算周数
function checkDate(startTime, endTime) {
  //日期格式化
  var start_date = new Date(startTime.replace(/-/g, "/"));
  // console.log(start_date)
  var end_date = new Date(endTime.replace(/-/g, "/"));
  // console.log(end_date)
  //转成毫秒数，两个日期相减
  var ms = end_date.getTime() - start_date.getTime();
  //转换成天数
  var day = parseInt(ms / (1000 * 60 * 60 * 24));
  // console.log(day)
  // var week = day/7;
  // if(day%7==0)
  //   week=week+1;
  // console.log(week)

  var week =1;
  // do something
  while(day>=7){
    day=day-7;
    week+=1;
  }
  // console.log("week = ", week);
  return week;
}
module.exports = {
  formatTime: formatTime, 
  formatTime2: formatTime2,
  md5: md5,
  base64: base64,
  key: key,
  checkDate: checkDate
}