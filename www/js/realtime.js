google.charts.load('current', {packages: ['corechart', 'line']});
google.charts.setOnLoadCallback(realdata);

function realdata() {
  $.get("http://dust.toycode.org/all", function(data) {
    drawBasic(data);
  });
  setTimeout(realdata, 10 * 1000);
}

function drawBasic(result) {
      console.log(result[0].date);
      $('#dustvalue').text(parseInt(result[0].dustvalue*100+0.5,10));
      var data = new google.visualization.DataTable();
      data.addColumn('date', 'X');
      data.addColumn('number', 'Dust Density');
      data.addColumn({type: 'string', role: 'tooltip'});
      data.addRows(
        result.map(function(obj, index) {
          var time = obj.date - obj.date % 10000,
              value = parseInt(obj.dustvalue*100+0.5,10),
              tooltip;
          tooltip = "측정시간: " + moment(time).format('h:mm:ss', 'kr') + "\n먼지측정값 : " + value;
          return [new Date(time), value, tooltip];
        })
      );

      var options = {
        hAxis: {
          gridlines: {
            count: -1,
            units: {
              days: {format: ['MMM dd']},
              hours: {format: ['HH:mm', 'ha']},
            }
          },
          minorGridlines: {
            units: {
              hours: {format: ['hh:mm:ss a', 'ha']},
              minutes: {format: ['HH:mm a Z', ':mm']}
            }
          }
        },
        vAxis: {
          title: 'Dust Density'
        },
        tooltip: {isHtml: true}
      };


      var chart = new google.visualization.LineChart(document.getElementById('chart_div'));

      chart.draw(data, options);
    }
