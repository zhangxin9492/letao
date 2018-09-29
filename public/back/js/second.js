/**
 * Created by zhangxin on 2018/9/29.
 */
$(function(){
//  渲染表格
  var currentPage = 1;
  var pageSize = 5;
  function render(){
    $.ajax({
      url:'/category/querySecondCategoryPaging',
      type:'get',
      dataType:'json',
      data:{
        page:currentPage,
        pageSize:pageSize
      },
      success:function(info){
        //console.log(info)
        var str = template('addtmp',info);
        $('tbody').html(str);
        $("#pagintor").bootstrapPaginator({
          bootstrapMajorVersion:3,//默认是2，如果是bootstrap3版本，这个参数必填
          currentPage:currentPage,//当前页
          totalPages:Math.ceil(info.total/pageSize),//总页数
          size:"small",//设置控件的大小，mini, small, normal,large
          onPageClicked:function(a,b,c,page){
            //为按钮绑定点击事件 page:当前点击的按钮值
            currentPage = page
            render();
          }
        });
      }
    })
  }
  render()

  $('.add-btn').on('click',function(){
    $('#addmyModal').modal('show');
  })
//  下拉框数据填充
  $.ajax({
    url:'/category/queryTopCategoryPaging',
    type:'get',
    dataType:'json',
    data:{
      page:1,
      pageSize:1000
    },
    success:function(info){
      console.log(info)
      var str = template('selecttmp',info);
      $('.dropdown-menu').html(str);
    }
  })
//  点击下拉框:将id传递给隐藏域,改变按钮文本内容
  $('.dropdown-menu').on('click','.category-btn',function(){
    $('.btn-txt').text($(this).text());
    $('.getId').val($(this).data('id'));
    $("#form").data('bootstrapValidator').updateStatus('categoryId', 'VALID');
  })
//  图片预览
  $("#fileupload").fileupload({
    dataType:"json",
    //e：事件对象
    //data：图片上传后的对象，通过data.result.picAddr可以获取上传后的图片地址
    done:function (e, data) {
      console.log(data);
      var url = data.result.picAddr;
      $('#addmyModal img').attr('src',url);
      $('input[name="brandLogo"]').val(url);
    //  当添加图片时改变表单验证的状态
      $("#form").data('bootstrapValidator').updateStatus('brandLogo', 'VALID');
    }
  });


//表单验证
  $('#form').bootstrapValidator({
    //1. 指定不校验的类型，默认为[':disabled', ':hidden', ':not(:visible)'],可以不设置
    excluded: [],

    //2. 指定校验时的图标显示，默认是bootstrap风格
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
    },

    //3. 指定校验字段
    fields: {
      //校验用户名，对应name表单的name属性
      brandName: {
        validators: {
          //不能为空
          notEmpty: {
            message: '用户名不能为空'
          },
        }
      },
      categoryId: {
        validators: {
          //不能为空
          notEmpty: {
            message: '用户名不能为空'
          },
        }
      },
      brandLogo: {
        validators: {
          //不能为空
          notEmpty: {
            message: '用户名不能为空'
          },
        }
      },
    }

  });
//  表单验证成功时触发success-form-bv事件
  $('#form').on('success.form.bv',function(e){
    e.preventDefault();
    $.ajax({
      url:'/category/addSecondCategory',
      type:'post',
      data:$('#form').serialize(),
      success:function(info){
        console.log(info);
        $('#addmyModal').modal('hide');
        $("#form").data('bootstrapValidator').resetForm(true);
        $('#addmyModal img').attr('src','../upload/brand/09020390-9915-11e8-8316-b7759d7b051b.gif');
        $('.btn-txt').text('添加分类')
        currentPage = 1;
        render();
      }
    })
  })
})
