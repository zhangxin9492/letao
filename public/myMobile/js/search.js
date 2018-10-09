/**
 * Created by zhangxin on 2018/10/9.
 */
$(function(){
  //1:添加历史记录
  var arr = JSON.parse(localStorage.getItem('productList')) || [];
  console.log(arr);
  function render(){
    var obj = {list:arr}
    var str = template('history-tmp',obj);
    $('.search_history').html(str);
  }
  render();

//点击按钮,添加记录
  $('.lt_main .search button').click(function(){
    var val = $('.lt_main .search input').val();
    if (!val) {
      mui.toast('请输入搜索关键字',{ duration:'short', type:'div' })
      return;
    }
    var index = arr.indexOf(val);
    if (index != -1) {
      arr.splice(index,1);
    }
    arr.unshift(val);
    if (arr.length >= 10) {
      arr.pop();
    }
    var str = JSON.stringify(arr);
    localStorage.setItem('productList',str);
    render();
    $('.lt_main .search input').val('');
    location.href='searchList.html';
  })

//  删除一项纪录
  $('.search_history').on('click','.btn_delete',function(){
    mui.confirm('是否删除该条记录','温馨提示',['取消','确认'],function(e){
      if (e.index == 1) {
        var index = $(this).data('id');
        arr.splice(index,1);
        var str = JSON.stringify(arr);
        localStorage.setItem('productList',str);
        render();
      }
    },'div')
  })

//  清空记录
  $('.search_history').on('click','.history_empty',function(){
    mui.confirm('是否删除所有记录','温馨提示',['取消','确认'],function(e){
      if (e.index == 1) {
        arr = [];
        var str = JSON.stringify(arr);
        localStorage.setItem('productList',str);
        render();
      }
    },'div')

  })
})
