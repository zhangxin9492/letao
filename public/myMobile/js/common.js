/**
 * Created by zhangxin on 2018/10/9.
 */
//初始化区域滚动
mui('.mui-scroll-wrapper').scroll({
  deceleration: 0.0005, //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
  indicators: false,//是否显示滚动条
});

//封装获取URL参数公共函数
function getUrl(key){
  var str = location.search;
  var str = str.slice(1);
  var arr = str.split('&');
  var obj = {};
  arr.forEach(function(v,i){
    var key = v.split('=')[0];
    var val = v.split('=')[1];
    obj[key] = val;
  })
  return obj[key];
}



