// var app = {
//     // Application Constructor
//     initialize: function() {
//         this.bindEvents();
//     },
//     // Bind Event Listeners
//     //
//     // Bind any events that are required on startup. Common events are:
//     // 'load', 'deviceready', 'offline', and 'online'.
//     bindEvents: function() {
//         document.addEventListener('deviceready', this.onDeviceReady, false);
//     },
//     // deviceready Event Handler
//     //
//     // The scope of 'this' is the event. In order to call the 'receivedEvent'
//     // function, we must explicitly call 'app.receivedEvent(...);'
//     onDeviceReady: function() {
//         app.receivedEvent('deviceready');
//     },
//     // Update DOM on a Received Event
//     receivedEvent: function(id) {
//         var parentElement = document.getElementById(id);
//         var listeningElement = parentElement.querySelector('.listening');
//         var receivedElement = parentElement.querySelector('.received');
//
//         listeningElement.setAttribute('style', 'display:none;');
//         receivedElement.setAttribute('style', 'display:block;');
//
//         console.log('Received Event: ' + id);
//     }
// };
//
// app.initialize();

$(function() {
  $.get("http://dust.toycode.org/all", function(data) {
    for(var i = 0; i < data.length; i++) {
      var $tr = $("<tr>"),
          dateStr = moment(data[i].date).format('YYYYMMDD, h:mm:ss', 'kr'),
          $td1 = $("<td>").text(dateStr),
          $td2 = $("<td>").text(data[i].dustvalue);
      $tr.append($td1, $td2);
      $(".Dtable tbody").append($tr);
    }
  });
});
