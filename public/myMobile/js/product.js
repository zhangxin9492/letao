/**
 * Created by zhangxin on 2018/10/10.
 */
var id = getUrl('id');
console.log(id);
$.ajax({
  url:'/product/queryProductDetail',
  type:'get',
  data:{id:id},
  dataType:'json',
  success:function(info){
    console.log(info);
    var str = template('productTmp',info);
    $('.mui-scroll').html(str);

    //????为什么初始化需要放在ajax请求中
    //  轮播图初始化
    var gallery = mui('.mui-slider');
    gallery.slider({
      interval:5000//自动轮播周期，若为0则不自动播放，默认为0；
    });
    //初始化数字输入框
    mui('.mui-numbox').numbox();
  }
})

//选择尺码
$('.mui-scroll').on('click','.lt_size span',function(){
  $(this).addClass('current').siblings().removeClass('current');
})
//点击添加进购物车
$('#addCart').click(function(){
  var num = $('.mui-numbox-input').val();
  var size = $('.lt_size span.current').text();
  if (!size) {
    mui.toast('请选择尺码');
    return;
  }
  $.ajax({
    url:'/cart/addCart',
    type:'post',
    data:{
      productId:id,
      num:num,
      size:size
    },
    dataType:'json',
    success:function(info){
      console.log(info);
      if (info.error == 400) {
        location.href = 'login.html?retUrl'+location.href;
      }
      if (info.success == true) {
        location.href = 'cart.html';
      }
    }
  })
})