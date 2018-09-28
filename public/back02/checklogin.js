/**
 * Created by zhangxin on 2018/9/28.
 */
//判断登录状态
$.ajax({
  url:'/employee/checkRootLogin',
  type:'get',
  success:function(info){
    console.log(info);
    if (info.error == 400) {
      location.href = 'http://localhost:3000/back02/login.html';
    }
  }
})