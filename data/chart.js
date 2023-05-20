export default option = {
    title: {
      text: '全国城镇调查失业率'
    },
    tooltip: {
      trigger: 'axis'
    },
    legend: {
      data: ['全国城镇调查失业率(%)','全国25-59岁人口城镇调查失业率(%)','全国16-24岁人口城镇调查失业率(%)']
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    toolbox: {
      feature: {
        saveAsImage: {}
      }
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      name:'date',
      data: [
    '2018.01', '2018.02', '2018.03', '2018.04',
    '2018.05', '2018.06', '2018.07', '2018.08',
    '2018.09', '2018.10', '2018.11', '2018.12',
    '2019.01', '2019.02', '2019.03', '2019.04',
    '2019.05', '2019.06', '2019.07', '2019.08',
    '2019.09', '2019.10', '2019.11', '2019.12',
    '2020.01', '2020.02', '2020.03', '2020.04',
    '2020.05', '2020.06', '2020.07', '2020.08',
    '2020.09', '2020.10', '2020.11', '2020.12',
    '2021.01', '2021.02', '2021.03', '2021.04',
    '2021.05', '2021.06', '2021.07', '2021.08',
    '2021.09', '2022.10', '2021.11', '2021.12',
    '2022.01', '2022.02', '2022.03', '2022.04',
    '2022.05', '2022.06', '2022.07', '2022.08',
    '2022.09', '2022.10', '2022.11', '2022.12',
    '2023.01', '2023.02', '2023.03', '2023.03'
  ]
    },
    yAxis: {
      type: 'value',
      name:'rate',
  
    },
    series: [
      {
        name: '全国城镇调查失业率(%)',
        type: 'line',
        smooth: 0.6,
        label: {
          show: true,
        },
        data: [
      5,   5, 5.1, 4.9, 4.8, 4.8, 5.1,   5, 4.9, 4.9,
    4.8, 4.9, 5.1, 5.3, 5.2,   5,   5, 5.1, 5.3, 5.2,
    5.2, 5.1, 5.1, 5.2,  5.3, 6.2, 5.9,   6, 5.9, 5.7,
    5.7, 5.6, 5.4, 5.3, 5.2, 5.2, 5.4, 5.5, 5.3, 5.1,
      5,   5, 5.1, 5.1, 4.9, 4.9,   5, 5.1, 5.3, 5.5,
    5.8, 6.1, 5.9, 5.5, 5.4, 5.3, 5.5, 5.5, 5.7, 5.5,
    5.5, 5.6, 5.3,5.2
  ]
      },
      {
        name: '全国25-59岁人口城镇调查失业率(%)',
        type: 'line',
        smooth: 0.6,
        label: {
          show: true,
          position: 'bottom'
        },
        data: [
    4.4, 4.5, 4.6, 4.4, 4.4, 4.4, 4.4, 4.3, 4.3, 4.4,
    4.4, 4.4, 4.6, 4.9, 4.8, 4.7, 4.5, 4.6, 4.6, 4.5,
    4.6, 4.6, 4.6, 4.7, 4.7, 5.6, 5.4, 5.5, 5.4, 5.2,
      5, 4.8, 4.8, 4.8, 4.7, 4.7, 4.9,   5, 4.8, 4.6,
    4.4, 4.2, 4.2, 4.3, 4.2, 4.2, 4.3, 4.4, 4.6, 4.8,
    5.2, 5.3, 5.1, 4.5, 4.3, 4.3, 4.7, 4.7,   5, 4.8,
    4.7, 4.8, 4.3,4.2
  ]
      },
      {
        name: '全国16-24岁人口城镇调查失业率(%)',
        type: 'line',
        smooth: 0.6,
        label: {
          show: true
        },
        markPoint: {
          data: [
            {
            type:'max',name:'最大值',
            symbol:'circle',
            symbolOffset:[0, '-100%'],
            label:{formatter:'最大值\n2023.04 \n{c}%'},
            itemStyle:{color:'red'},
          },{type:'min',name:'最小值', 
                symbol:'circle',
                label:{formatter:'最小值\n2018.05 \n{c}%'},
            symbolRotate:180,
            symbolOffset:['0%', '+60%']
          },
            {
              name: '2018.04',label:{formatter:'2018.04\n 10.1%'},
              coord: ['2018.04', 10.1],itemStyle:{color:'green'},
              symbol:'circle',symbolOffset:['0%', '-100%']
            },
            {
              name: '2019.04',label:{formatter:'2019.04\n 9.9%'},
              coord: ['2019.04', 9.9],itemStyle:{color:'green'},
              symbol:'circle',symbolOffset:['0%', '+100%']
            },
            {
              name: '2020.04',label:{formatter:'2020.04\n 13.3%'},
              coord: ['2020.04', 13.3],itemStyle:{color:'green'},
              symbol:'circle',symbolOffset:['0%', '+100%']
            },
            {
              name: '2021.04',label:{formatter:'2021.04\n 13.6%'},
              coord: ['2021.04', 13.6],itemStyle:{color:'green'},
              symbol:'circle',symbolOffset:['0%', '100%']
            },
            {
              name: '2022.04',label:{formatter:'2022.04\n 18.2%'},
              coord: ['2022.04', 18.2],itemStyle:{color:'red'},
              symbol:'circle',symbolRotate:180,symbolOffset:['+40%', '+100%']
            },
            {
              name: '2023.04',label:{formatter:'2023.04\n 20.4%'},
              coord: ['2023.04', 19.6],itemStyle:{color:'red'},
              symbol:'circle',symbolOffset:['0%', '-100%']
            },
            // {
            //   name: 'comment',label:{formatter:'19.6% 意味着,接近每 5个16-24岁劳动力，就有一个人处于失业状态'},
            //   coord: ['2021.07', 10],itemStyle:{color:'white'},
            //   symbol:'square',symbolOffset:['0%', '-100%']
            // },
          ]
        },
        markLine:{
          symbol: ['none', 'none'],
          label: { show: false },
          data: [
            // {type:'average',name:'平均值',label:{show:true}},
            { xAxis: 0 },{ xAxis: 24 },
            // { xAxis: '2018.03',lineStyle:{color:'red'}},
            // { xAxis: '2019.03',lineStyle:{color:'red'}},
            // { xAxis: '2020.03',lineStyle:{color:'red'}},
            // { xAxis: '2021.03',lineStyle:{color:'red'}},
            // { xAxis: '2022.03',lineStyle:{color:'red'}},
            // { xAxis: '2023.03',lineStyle:{color:'red'}},
          ]
        },
        // areaStyle: {},
        markArea:{
          data:[
            
             [{
              name: '2018.01-2020.01',
              xAxis: 0
          },
          {
              xAxis: 24
          }],
          
          
           [{
              name: '2020.01-2023.04',
              itemStyle:{
                color:'rgb(255, 255, 255)'
              },
              xAxis: 24
          },
          {
              xAxis: 64
          }]
            ]
        },
        
        data: [
    11.2,   11, 10.4, 10.1,  9.6,   10, 13.3, 13.1,
    11.2,  9.8,   10, 10.1, 11.2,   11, 11.3,  9.9,
    10.5, 11.6, 13.9, 13.1,   13, 12.4, 12.5, 12.2,
    12.5, 13.6, 13.3, 13.8, 14.8, 15.4, 16.8, 16.8,
      15, 13.2, 12.8, 12.3, 12.7, 13.1, 13.6, 13.6,
    13.8, 15.4, 16.2, 15.3, 14.6, 14.2, 14.3, 14.3,
    15.3, 15.3,   16, 18.2, 18.4, 19.3, 19.9, 18.7,
    17.9, 17.9, 17.1, 16.7, 17.3, 18.1, 19.6,20.4
  ]
      }
    ]
  };