/**
 * Created by zhangxin on 2018/10/11.
 */
$(function(){
  $('#loginBtn').click(function(){
    var username = $('#username').val();
    var password = $('#password').val();
    var str = location.search;
    if (!username) {
      mui.toast('请输入用户名');
      return;
    }
    if (!password) {
      mui.toast('请输入密码');
      return;
    }
    $.ajax({
      url:'/user/login',
      type:'post',
      data:{
        username:username,
        password:password,
      },
      dataType:'json',
      success:function(info){
        console.log(info);
        if (info.error == 403) {
          mui.toast('用户名或密码错误');
          return;
        }
        if (str.indexOf('retUrl') != -1) {
          str = str.slice(7);
          location.href = str;
          return;
        }
        location.href = 'user.html';
      }
    })
  })
})
