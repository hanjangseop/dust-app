google.charts.load('current', {packages: ['corechart', 'bar']});
google.charts.setOnLoadCallback(realdata);

function realdata() {
  $.get("http://dust.toycode.org/all", function(data) {
    drawBasic(data);
  });
}

function drawBasic(result) {
      var data = new google.visualization.DataTable();
      data.addColumn('timeofday', 'X');
      data.addColumn('number', 'Dust Density');
      data.addColumn({type: 'string', role: 'tooltip'});
      data.addRows(
        result.map(function(obj, index) {
          var time = obj.date - obj.date % 10000,
              value = parseInt(obj.dustvalue*100+0.5,10),
              tooltip;
          tooltip = "측정시간: " + moment(time).format('h a', 'kr') + "\n먼지측정값 : " + value;
          return [{
            v:[+moment(time).format('h', 'kr'), 0, 0],
            f: moment(time).format('h a', 'kr')
          }, value, tooltip];
        })
      );

      var options = {
        hAxis: {
         title: 'Time of Day',
         format: 'h a'
       },
        vAxis: {
          title: 'Dust Density'
        },
        tooltip: {isHtml: true}
      };


      var chart = new google.visualization.ColumnChart(document.getElementById('chart_div'));


      chart.draw(data, options);
    }
