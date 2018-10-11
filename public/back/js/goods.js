/**
 * Created by zhangxin on 2018/9/29.
 */
$(function(){
  var currentPage = 1;
  var pageSize = 3;
  var picArr = [];
  function render(){
    $.ajax({
      url:'/product/queryProductDetailList',
      type:'get',
      dataType:'json',
      data:{
        page:currentPage,
        pageSize:pageSize
      },
      success:function(info){
        var str = template('tmp',info);
        $('tbody').html(str);
        $("#pagintor").bootstrapPaginator({
          bootstrapMajorVersion:3,//默认是2，如果是bootstrap3版本，这个参数必填
          currentPage:currentPage,//当前页
          totalPages:Math.ceil(info.total/pageSize),//总页数
          size:"small",//设置控件的大小，mini, small, normal,large
          onPageClicked:function(event, originalEvent, type,page){
            //为按钮绑定点击事件 page:当前点击的按钮值
            currentPage = page;
            render()
          }
        });

      }
    })
  }
  render();
  //弹出模态框
  $('.add-goods').on('click',function(){
    $('#addmyModal').modal('show');
  })
//填充下拉框
  $.ajax({
    url:'/category/querySecondCategoryPaging',
    type:'get',
    data:{
      page:1,
      pageSize:100
    },
    dataType:'json',
    success:function(info){
      console.log(info);
      var str = template('select_tmp',info);
      $('.secondCategory').html(str);
    }
  })

  //点击下拉框,获取文本
  $('.secondCategory').on('click','a',function(){
    var id = $(this).data('id');
    $('input[name="brandId"]').val(id);
    $('#dropdownMenu1 .text').text($(this).text());
    $("#form").data('bootstrapValidator').updateStatus('brandId', 'VALID');
  })

//多文件上传
  $("#fileupload").fileupload({
    dataType:"json",
    //e：事件对象
    //data：图片上传后的对象，通过data.result.picAddr可以获取上传后的图片地址
    done:function (e, data) {
      var pic = data.result;
      var picSrc = pic.picAddr;
      console.log(pic);
      picArr.unshift(pic);
      $('#imgBox').prepend('<img src='+picSrc+' alt="" width="100px" height="100px">');
      if (picArr.length > 3) {
        picArr.pop();
        $('#imgBox img:last-of-type').remove();
      }
      if (picArr.length == 3) {
        $("#form").data('bootstrapValidator').updateStatus('picStatus', 'VALID');
      }
    }
  });

//  表单校验初始化
  $('#form').bootstrapValidator({
    // 将默认的排除项, 重置掉 (默认会对 :hidden, :disabled等进行排除)
    excluded: [],

    // 配置图标
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
    },

    // 配置校验字段
    fields: {
      // 二级分类id, 归属品牌
      brandId: {
        validators: {
          notEmpty: {
            message: "请选择二级分类"
          }
        }
      },
      // 商品名称
      proName: {
        validators: {
          notEmpty: {
            message: "请输入商品名称"
          }
        }
      },
      // 商品描述
      proDesc: {
        validators: {
          notEmpty: {
            message: "请输入商品描述"
          }
        }
      },
      // 商品库存
      // 要求: 必须是非零开头的数字, 非零开头, 也就是只能以 1-9 开头
      // 数字: \d
      // + 表示一个或多个
      // * 表示零个或多个
      // ? 表示零个或1个
      // {n} 表示出现 n 次
      num: {
        validators: {
          notEmpty: {
            message: "请输入商品库存"
          },
          //正则校验
          regexp: {
            regexp: /^[1-9]\d*$/,
            message: '商品库存格式, 必须是非零开头的数字'
          }
        }
      },
      // 尺码校验, 规则必须是 32-40, 两个数字-两个数字
      size: {
        validators: {
          notEmpty: {
            message: "请输入商品尺码"
          },
          //正则校验
          regexp: {
            regexp: /^\d{2}-\d{2}$/,
            message: '尺码格式, 必须是 32-40'
          }
        }
      },
      // 商品价格
      price: {
        validators: {
          notEmpty: {
            message: "请输入商品价格"
          }
        }
      },
      // 商品原价
      oldPrice: {
        validators: {
          notEmpty: {
            message: "请输入商品原价"
          }
        }
      },
      // 标记图片是否上传满三张
      picStatus: {
        validators: {
          notEmpty: {
            message: "请上传3张图片"
          }
        }
      }
    }
  });

//当表单校验成功时触发success.form.bv事件
  $("#form").on('success.form.bv', function (e) {
    e.preventDefault();
    //使用ajax提交逻辑
    var str = $('#form').serialize();
    str+= '&picName1=' + picArr[0].picName + '&picAddr1=' + picArr[0].picAddr;
    str+= '&picName1=' + picArr[1].picName + '&picAddr1=' + picArr[1].picAddr;
    str+= '&picName1=' + picArr[2].picName + '&picAddr1=' + picArr[2].picAddr;
    //console.log(str);
    $.ajax({
      url:'/product/addProduct',
      type:'post',
      data:str,
      dataType:'json',
      success:function(info){
        console.log(info);
        if (info.success == true) {
          render();
          $('#addmyModal').modal('hide');
        }
      }
    })
  });
})
