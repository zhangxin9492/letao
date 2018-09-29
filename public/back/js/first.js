/**
 * Created by zhangxin on 2018/9/29.
 */
$(function(){
  var currentPage = 1;
  var pageSize = 5;
  //表格页面渲染
  function render(){
    $.ajax({
      url:'/category/queryTopCategoryPaging',
      type:'get',
      dataType:'json',
      data:{
        page:currentPage,
        pageSize:pageSize
      },
      success:function(info){
        console.log(info);
        var str = template('addtmp',info);
        $('tbody').html(str);
        $("#pagintor").bootstrapPaginator({
          bootstrapMajorVersion:3,//默认是2，如果是bootstrap3版本，这个参数必填
          currentPage:currentPage,//当前页
          totalPages:Math.ceil(info.total/pageSize),//总页数
          size:"small",//设置控件的大小，mini, small, normal,large
          onPageClicked:function(a,b,c,page){
            //为按钮绑定点击事件 page:当前点击的按钮值
            currentPage = page;
            render()
          }
        });
      }
    })
  }
  render()
  //显示添加分类模态框
  $('.addbtn').on('click',function(){
    $('#addmyModal').modal('show');
  })
  //使用表单校验插件
  $('#form').bootstrapValidator({
    //2. 指定校验时的图标显示，默认是bootstrap风格
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
    },

    //3. 指定校验字段
    fields: {
      //校验用户名，对应name表单的name属性
      categoryName: {
        validators: {
          //不能为空
          notEmpty: {
            message: '用户名不能为空'
          },
        }
      },
    }
  });

// 当表单校验完成后触发success.form.bv事件
  $('#form').on('success.form.bv',function(e){
    e.preventDefault();
    $.ajax({
      url:'/category/addTopCategory',
      type:'post',
      dataType:'json',
      data:$('#form').serialize(),
      success:function(info){
        if (info.success) {
          $("#form").data('bootstrapValidator').resetForm(true);
          $('#addmyModal').modal('hide');
          currentPage =1;
          render()
        }
      }
    })
  })
})

