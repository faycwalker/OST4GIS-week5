/* =====================
 Copy your code from Week 4 Lab 2 Part 2 part2-app-state.js in this space
===================== */
/* =====================
  Lab 2, part 2 - application state

  Spatial applications aren't typically as simple as putting data on a map. In
  addition, you'll usually need to change the stored data in response to user
  input. This lab walks you through writing a set of functions that are capable
  of building an interactive application.

  First, we'll need to write a function for loading points onto the map. Choose
  any dataset from part1 and write a function here to download it, parse it,
  make it into markers, and plot it. You'll know you've succeeded when you can
  see markers on the map.

  NOTE 1: When we have added markers to the map in the past, we have used a line like:

       L.marker([50.5, 30.5]).addTo(map);

       This is accomplishing two goals. L.marker([50.5, 30.5]) makes a marker
       and .addTo(map) adds that marker to the map. This task differs in that
       you are being asked to create separate functions: one to create markers
       and one to add them to the map.

  (IMPORTANT!)
  NOTE 2: These functions are being called for you. Look to the bottom of this file
       to see where and how the functions you are defining will be used. Remember
       that function calls (e.g. func();) which are equal to a value (i.e. you
       can set a var to it: var result = func();) must use the 'return' keyword.

       var justOne = function() {
         return 1;
       }
       var one = justOne();


       downloadData.done(function(data) {
         var parsed = parseData(data);
         var markers = makeMarkers(parsed);
         plotMarkers(markers);
         removeMarkers(markers);
       });
       var solarInstall = $.ajax ("https://raw.githubusercontent.com/CPLN-692-401/datasets/master/json/philadelphia-solar-installations.json")
       solarInstall.then(function(res) {console.log(JSON.parse(res))})

     ===================== */
     var map = L.map('map', {
       center: [39.9522, -75.1639],
       zoom: 14
     });
     var Stamen_TonerLite = L.tileLayer('http://stamen-tiles-{s}.a.ssl.fastly.net/toner-lite/{z}/{x}/{y}.{ext}', {
       attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
       subdomains: 'abcd',
       minZoom: 0,
       maxZoom: 20,
       ext: 'png'
     }).addTo(map);

     /* =====================
      CODE EXECUTED HERE!
     ===================== */


/* =====================
 Leaflet setup - feel free to ignore this
===================== */


var parseData = function (data){return JSON.parse(data)}
var markers2;
var makeMarkers = function (myObject, lat, long) {
  // markers2=L.marker([parseFloat(myObject[lat]), parseFloat(myObject[long])])
  return _.map (myObject, function (item) {
    return L.marker ([parseFloat(item[lat]), parseFloat(item[long])]);
  })
};
var plotMarkers = function(mymarkers) {
  _.each(mymarkers,function(mymarker){
    mymarker.addTo(map)
  })
};

var removeMarkers = function(list) {
  return _.map(list, function (marker) {map.removeLayer (marker)})
};

$('#LAT').prop('disabled', false);
$('#LONG_').prop('disabled', false);

$('#button1').click(function () {
  $(document).ready(function() {
    var vals = {
      value1: $('#url-input').val(),
      value2: $('#LAT').val(),
      value3: $('#LONG_').val()
   }
console.log(vals.value2)
  var downloadData = $.ajax (vals.value1)
  downloadData.done (function(data) {
    var parsedData = parseData (data)
    console.log(parsedData[0].LAT);
    markers2=makeMarkers (parsedData, vals.value2, vals.value3);
    console.log(markers2);
    plotMarkers (markers2)
  });
});
})
