/**
 * Created by zhangxin on 2018/10/10.
 */
  $(function(){
    var val = getUrl('key');
    $('.lt_main .search input').val(val);
    function render(){
      $('.lt_product').html('<div class="loading"></div>');
      var proName = $('.lt_main .search input').val();
      var obj = {};
      obj.proName = proName;
      obj.page = 1;
      obj.pageSize = 100;
      var $current = $('.lt_main .sort a.current');
      if ($current.length > 0) {
        var sortName = $current.data('type');
        var sortValue = $current.find('i').hasClass('fa-angle-down')? 2 : 1;
        obj[sortName] = sortValue;
      }
      setTimeout(function(){
        $.ajax({
          url:'/product/queryProduct',
          type:'get',
          data:obj,
          dataTyep:'json',
          success:function(info){
            var str = template('listTmp',info);
            $('.lt_product').html(str);
          }
        })
      },500)
    }
    //进入页面后先渲染一次,根据URL传参
    render();
    $('.lt_main .search button').click(function(){
      render();
    })

    //点击重新排序
    $('.lt_main .sort a[data-type]').click(function(){
      if ($(this).hasClass('current')) {
        $(this).find('i').toggleClass('fa-angle-down').toggleClass('fa-angle-up');
      }else {
        $(this).addClass('current').siblings().removeClass('current');
      }
      render();
    })

  })
