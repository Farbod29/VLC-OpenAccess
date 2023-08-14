Highcharts.chart('container', {
    chart: {
      type: 'bar'
    },
    title: {
      text: 'Total votes for all three pictures'
    },
    subtitle: {
    },
    xAxis: {
      categories: ['Classification 1', 'Classification 2'],
      title: {
        text: null
      }
    },
    yAxis: {
      min: 0,
      title: {
        text: 'Population (millions)',
        align: 'high'
      },
      labels: {
        overflow: 'justify'
      }
    },
    tooltip: {
      valueSuffix: ' millions'
    },
    plotOptions: {
      bar: {
        dataLabels: {
          enabled: true
        }
      }
    },
    legend: {
      layout: 'vertical',
      align: 'right',
      verticalAlign: 'top',
      x: 10,
      y: 80,
      floating: true,
      borderWidth: 1,
      backgroundColor:
        Highcharts.defaultOptions.legend.backgroundColor || '#FFFFFF',
      shadow: true
    },
    credits: {
      enabled: false
    },
    series: [{
      name: 'Fake',
      data: [21.1, 31 ],
      color:'red'
    }, {
      name: 'Probably Fake',
      data: [26.3, 20],
      color:'#FF7276'
    }, {
      name: 'Not Sure',
      data: [5.3, 10],
      color:'#99951d'
    },{    
      name: 'Probably Fact',
      data: [26.3, 20],
      color:'#87f39c'
    },
             {
      name: 'Fact',
      data: [21.1, 25],
      color: '#08c62c'         
    }, ]
  });