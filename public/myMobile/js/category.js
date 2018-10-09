/**
 * Created by zhangxin on 2018/10/9.
 */
$(function(){
  //获取一级分类
  $.ajax({
    url:'/category/queryTopCategory',
    type:'get',
    dataType:'json',
    success:function(info){
      console.log(info);
      var str = template('category_tmp',info);
      $('.lt_main_left ul').html(str);
    }
  })
  function render(id){
    $.ajax({
      url:' /category/querySecondCategory',
      type:'get',
      dataType:'json',
      data:{id:id||1},
      success:function(info){
        var str = template('category02_tmp',info);
        $('.lt_main_right ul').html(str);
      }
    })
  }
  render();
//  根据一级分类渲染二级分类
    $('.lt_main_left ul').on('click','.lt_main_left ul li',function(){
      $(this).addClass('current').siblings().removeClass('current');
      var id = $(this).data('id');
      render(id);
    })
})
