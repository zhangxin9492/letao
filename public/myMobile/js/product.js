/**
 * Created by zhangxin on 2018/10/10.
 */
var id = getUrl('id');
console.log(id);
$.ajax({
  url:'/product/queryProductDetail',
  type:'get',
  data:{id:id},
  dataType:'json',
  success:function(info){
    console.log(info);
    var str = template('productTmp',info);
    $('.lt_main').html(str);
  }

})
