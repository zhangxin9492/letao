/**
 * Created by zhangxin on 2018/9/28.
 */
//网络延迟进度条
$(document).ajaxStart(function () {
  NProgress.start();
});
$(document).ajaxStop(function () {
  setTimeout(function(){
    NProgress.done();
  },500)
});

//导航隐藏显示切换
$('.nav_mangment .category').on('click',function(){
  $('.nav_mangment .second_nav').stop().slideToggle();
})

//侧边栏隐藏
$('.topbar .pull-left').on('click',function(){
  $('.lt_aside').toggleClass('hidden_nav');
  $('.topbar').toggleClass('hidden_nav');
  $('.lt_main').toggleClass('hidden_nav');
})

//显示模态框
$('.topbar .pull-right').on('click',function(){
  $('#myModal').modal('show');
})

//确定退出登录
$('.btns-confirm').on('click',function(){
  $.ajax({
    url:'/employee/employeeLogout',
    type:'get',
    success:function(info){
      if (info.success) {
        location.href = 'http://localhost:3000/back02/login.html';
      }
    }
  })
})