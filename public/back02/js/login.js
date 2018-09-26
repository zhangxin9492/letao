/**
 * Created by zhangxin on 2018/9/26.
 */
//1:表单验证初始化
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
    username: {
      validators: {
        //不能为空
        notEmpty: {
          message: '用户名不能为空'
        },
        //长度校验
        stringLength: {
          min: 3,
          max: 6,
          message: '用户名长度必须在3-6之间'
        },
        callback: {
          message: '用户名不正确',
        }
      }
    },
    password:{
      validators: {
        //检验非空
        notEmpty: {
          message: "密码不能为空",
        },
        stringLength: {
          min: 3,
          max: 6,
          message: "密码长度必须在3-6之间"
        },
        callback: {
          message: '密码不正确',
        }
      }
    }
  }

});

//表单验证成功后,会触发success.form.bv事件,当触发此事件是我们需要,阻止表单提交的默认跳转,改用ajax提交表单
$("#form").on('success.form.bv', function (e) {
  e.preventDefault();
  //使用ajax提交逻辑
  //登录接口
  //- 接口地址
  ///employee/employeeLogin
  //- 请求方式
  //POST

  $.ajax({
    url:'/employee/employeeLogin',
    type:'post',
    data:$('#form').serialize(),
    dataType:'json',
    success:function(info){
      console.log(info);
      if (info.success) {
        location.href = 'http://localhost:3000/back02/index.html';
      }
      if (info.error == 1000 ) {
        $("#form").data('bootstrapValidator').updateStatus('username', 'INVALID', 'callback');
      }
      if (info.error == 1001) {
        $("#form").data('bootstrapValidator').updateStatus('password', 'INVALID', 'callback');
      }
    }
  })
});

//表单重置
$('button[type="reset"]').on('click',function(){
  $("#form").data('bootstrapValidator').resetForm();
})

