/**
 * Created by zhangxin on 2018/10/11.
 */
$(function(){
  //一进入页面渲染个人信息
  function render(){

  }
  $.ajax({
    url:'/user/queryUserMessage',
    type:'get',
    dataType:'json',
    success:function(info){
      console.log(info);
      if (info.error == 400) {
        location.href = 'login.html';
      }
      var str = template('userTmp',info);
      $('#userInfo').html(str);
    }
  })
  //退出登录功能
  $('#logout').click(function(){
    mui.confirm('确定退出登录吗','温馨提示',['确认','取消'],function(e){
      console.log(e)
      if(e.index == 0) {
        $.ajax({
          url:'/user/logout',
          type:'get',
          dataType:'json',
          success:function(info){
            if (info.success == true) {
              location.href = 'login.html';
            }
          }
        })
      }
    },'div')
  })
})
