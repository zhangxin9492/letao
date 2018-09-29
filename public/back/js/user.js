/**
 * Created by zhangxin on 2018/9/27.
 */
$(function(){
  var currentPage = 1;
  var pageSize = 5;
  var id = 0;
  var isDelete = 0;
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

  $('tbody').on('click','.btn',function(){
    $('#changeModal').modal('show');
    id = $(this).parent().data('id');
    isDelete = $(this).hasClass('btn-default')? 0 :1;
  })
  $('.change_confirm').on('click',function(){
    $('#changeModal').modal('hide');
    $.ajax({
      url:'/user/updateUser',
      type:'post',
      dataType:'json',
      data:{
        id:id,
        isDelete:isDelete
      },
      success:function(info){
        if (info.success) {
          render();
        }
      }
    })
  })
})