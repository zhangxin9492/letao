/**
 * Created by zhangxin on 2018/10/11.
 */
$(function(){
  //进入页面渲染购物车页面
  function render(){
    setTimeout(function(){
      $.ajax({
        url:'/cart/queryCart',
        type:'get',
        dataType:'json',
        success:function(info){
          //判断登录状态,若没有登录跳转到登录页
          if (info.error == 400) {
            location.href = 'login.html?retUrl' + location.href;
            return;
          }
          console.log(info);
          var obj = {list:info};
          var str = template('cartTmp',obj);
          $('.mui-table-view').html(str);
          //结束下拉刷新
          mui('.mui-scroll-wrapper').pullRefresh().endPulldownToRefresh();
        }
      })
    },500)
  }
  render();
//  下拉刷新初始化
  mui.init({
    pullRefresh : {
      container:".mui-scroll-wrapper",//下拉刷新容器标识，querySelector能定位的css选择器均可，比如：id、.class等
      down : {
        height:50,//可选,默认50.触发下拉刷新拖动距离,
        auto: true,//可选,默认false.首次加载自动下拉刷新一次
        contentdown : "下拉可以刷新",//可选，在下拉可刷新状态时，下拉刷新控件上显示的标题内容
        contentover : "释放立即刷新",//可选，在释放可刷新状态时，下拉刷新控件上显示的标题内容
        contentrefresh : "正在刷新...",//可选，正在刷新状态时，下拉刷新控件上显示的标题内容
        callback :function(){
          render();
        } //必选，刷新函数，根据具体业务来编写，比如通过ajax从服务器获取新数据；
      }
    }
  });

//删除功能
//  点击事件委托需要绑定tap事件
$('.lt_main').on('tap','a.btn_delete',function(){
  var id = $(this).parent().data('id');
  mui.confirm('确定删除该商品','温馨提示',['确认','取消'],function(e){
    if(e.index == 0) {
      $.ajax({
        url:'/cart/deleteCart',
        type:'get',
        data:{id:id},
        dataType:'json',
        success:function(info){
          console.log(info);
          if(info.success == true) {
            //当删除完毕时触发一次下拉刷新
            mui(".mui-scroll-wrapper").pullRefresh().pulldownLoading();
          }
        }
      })
    }
  },'div')
})

//  编辑功能
  $('.lt_main').on('tap','.btn_edit',function(){
    var obj = this.dataset;
    var id = $(this).parent().data('id');
    var str = template('editTmp',obj);
    str = str.replace(/\n/g,'');
    mui.confirm(str,'编辑商品',['确认','取消'],function(e){
      if (e.index == 0) {
      var size = $('.lt_size span.current').text();
      var num = $('.lt_num .mui-numbox-input').val();
        $.ajax({
          url:'/cart/updateCart',
          data:{
            id:id,
            size:size,
            num:num,
          },
          type:'post',
          dataType:'json',
          success:function(info){
            if (info.success == true) {
              //  更新完毕后再次执行一次下拉刷新
              mui(".mui-scroll-wrapper").pullRefresh().pulldownLoading();

            }
          }
        })
      }
    },'div')

    //初始化数字输入框
    mui(".mui-numbox").numbox();
  })

//  点击按钮选择尺码
  $('body').on('click','.lt_size span',function(){
    $(this).addClass('current').siblings().removeClass('current');
  })
})
