/**
 * Created by zhangxin on 2018/9/28.
 */
//表格填充数据,
$(function(){
  var currentPage = 1;
  var pageSize = 5;
  function render(){
    $.ajax({
      url:'/user/queryUser',
      type:'get',
      dataType:'json',
      data:{
        page:currentPage,
        pageSize:pageSize
      },
      success:function(info) {
        console.log(info);
        var str = template('tmp',info);
        $('tbody').html(str);
        //由于分页需要使用ajax返回的数据所以需要写在ajax里面
        $("#pagintor").bootstrapPaginator({
          bootstrapMajorVersion:3,//默认是2，如果是bootstrap3版本，这个参数必填
          currentPage:currentPage,//当前页
          totalPages:Math.ceil(info.total/5),//总页数
          size:"small",//设置控件的大小，mini, small, normal,large
          onPageClicked:function(event, originalEvent, type,page){
            console.log(page)
            currentPage = page;
            render();
          }
        });
      }
    })
  }
  render();

  //改变用户状态
  $('tbody').on('click','.btn-forbit',function(){
    $('#myModal2').modal('show');
    var id =$(this).parent().data('id');
    $('.btn-confirm').on('click',function(){
      $('#myModal2').modal('hide')
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

  $('tbody').on('click','.btn-use',function(){
    $('#myModal2').modal('show');
    var id =$(this).parent().data('id');
    $('.btn-confirm').on('click',function(){
      $('#myModal2').modal('hide')
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
  })
})




