/**
 * Created by zhangxin on 2018/9/27.
 */
$(function(){
  var currentPage = 1;
  var pageSize = 5;
  function render(){
    $.ajax({
      url:'/user/queryUser',
      type:'get',
      data:{page:currentPage,pageSize:pageSize},
      success:function(info){
        var str = template("tmp",info);
        //console.log(info)
        $('tbody').html(str);
        $('#pagintor').bootstrapPaginator({
          bootstrapMajorVersion:3,//默认是2，如果是bootstrap3版本，这个参数必填
          currentPage:currentPage,//当前页
          totalPages:Math.ceil(info.total/pageSize),//总页数
          size:"small",//设置控件的大小，mini, small, normal,large
          onPageClicked:function(a,b,c,page){
            //console.log(page)
            currentPage = page;
            render();
          }
        });
      }
    })
  }
  render();

  $('tbody').on('click','.btns-forbit',function(){
    var id = $(this).parent().data('id');
    $.ajax({
      url:'/user/updateUser',
      type:'post',
      dataType:'json',
      data:{
        id:id,
        isDelete:0
      },
      success:function(info){
        if (info.success) {
          render();
        }
      }
    })
  })

  $('tbody').on('click','.btns-using',function(){
    var id = $(this).parent().data('id');
    $.ajax({
      url:'/user/updateUser',
      type:'post',
      dataType:'json',
      data:{
        id:id,
        isDelete:1
      },
      success:function(info){
        if (info.success) {
          render();
        }
      }
    })
  })
})