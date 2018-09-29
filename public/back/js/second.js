/**
 * Created by zhangxin on 2018/9/29.
 */
$(function(){
//  渲染表格
  var currentPage = 1;
  var pageSize = 5;
  $.ajax({
    url:'/category/querySecondCategoryPaging',
    type:'get',
    dataType:'json',
    data:{
      page:currentPage,
      pageSize:pageSize
    },
    success:function(info){
      console.log(info)
      var str = template('addtmp',info);
      $('tbody').html(str);
      $("#pagintor").bootstrapPaginator({
        bootstrapMajorVersion:3,//默认是2，如果是bootstrap3版本，这个参数必填
        currentPage:1,//当前页
        totalPages:10,//总页数
        size:"small",//设置控件的大小，mini, small, normal,large
        onPageClicked:function(event, originalEvent, type,page){
          //为按钮绑定点击事件 page:当前点击的按钮值
        }
      });

    }
  })
})