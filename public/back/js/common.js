/**
 * Created by zhangxin on 2018/9/27.
 */
//进度条功能
$(document).ajaxStart(function(){
  NProgress.start();
})
$(document).ajaxStop(function(){
  NProgress.done();
})

$(function(){
  //侧边栏切换
  $('.lt_aside a.category').on('click',function(){
    $('.lt_aside .hidden_nav').stop().slideToggle();
  })

//  侧边栏隐藏
  $('.topbar .pull-left').on('click',function(){
    $('.lt_aside').toggleClass('hidden_meau');
    $('.lt_main .topbar').toggleClass('hidden_meau');
    $('.lt_main .botbar').toggleClass('hidden_meau');
  })

//  显示模态框
  $('.topbar .pull-right').on('click',function(){
    $('#myModal').modal();
  })

  //退出登录
  $('.logout_confirm').on('click',function(){
    $.ajax({
      url:'/employee/employeeLogout',
      type:'get',
      success:function(info){
        if (info.success) {
          location.href = 'http://localhost:3000/back/login.html';
        }
      }
    })
  })

//判断登录状态
  $.ajax({
    url:'/employee/checkRootLogin',
    type:'get',
    dataType:'json',
    success:function(info){
      if (info.error == 400 ) {
        location.href = 'http://localhost:3000/back/login.html';
      }
    }
  })
})



