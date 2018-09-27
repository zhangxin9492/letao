/**
 * Created by zhangxin on 2018/9/27.
 */
var myChartl = echarts.init(document.querySelector('.botbar_l'));
var myChartr = echarts.init(document.querySelector('.botbar_r'));
// 指定图表的配置项和数据
var optionl = {
  title: {
    text: 'ECharts 入门示例'
  },
  tooltip: {},
  legend: {
    data:['销量']
  },
  xAxis: {
    data: ["衬衫","羊毛衫","雪纺衫","裤子","高跟鞋","袜子"]
  },
  yAxis: {},
  series: [{
    name: '销量',
    type: 'bar',
    data: [5, 20, 36, 10, 10, 20]
  }]
};

var optionr = {
  title : {
    text: '热门品牌销售',
    subtext: '2017年6月',
    x:'left'
  },
  tooltip : {
    trigger: 'item',
    formatter: "{a} <br/>{b} : {c} ({d}%)"
  },
  legend: {
    type: 'scroll',
    orient: 'vertical',
    right: 10,
    top: 20,
    bottom: 20,
    data: ['阿迪','耐克','李宁','安踏','newbalance'],
  },
  series : [
    {
      name: '品牌',
      type: 'pie',
      radius : '55%',
      center: ['40%', '50%'],
      data:[
        {value:335, name:'阿迪'},
        {value:310, name:'耐克'},
        {value:234, name:'李宁'},
        {value:135, name:'安踏'},
        {value:1548, name:'newbalance'}
      ],
      itemStyle: {
        emphasis: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: 'rgba(0, 0, 0, 0.5)'
        }
      }
    }
  ]
};
// 使用刚指定的配置项和数据显示图表。
myChartl.setOption(optionl);
myChartr.setOption(optionr);