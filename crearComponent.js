var totalData = [];

function init(){
  var is = document.getElementById('is').value;
  var type = document.getElementById('type').value;
  var title = document.getElementById('title').value;
  var subtitle = document.getElementById('subtitle').value;
  var xAxis = document.getElementById('xAxis').value;
  var yAxis = document.getElementById('yAxis').value;
  var series = document.getElementById('series').value;

  totalData.push({
    is: is,
    type: type,
    title: title,
    subtitle: subtitle,
    series: series,
    yAxis: yAxis
  });

console.log(JSON.stringify(totalData));
  var ref = new Firebase("https://polygraph.firebaseio.com/");
  var newPostRef = ref.push();
  newPostRef.set({
    chart: {
        renderTo: "container",
        type: totalData[0].type
    },
    title: {
        text: totalData[0].title,
        x: -20
    },
    subtitle: {
        text: totalData[0].subtitle,
        x: -20
    },
    xAxis: {
        categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
            'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    },
    yAxis: {
        title: {
            text: totalData[0].yAxis
      }
    },
    legend: {
        layout: 'vertical',
        align: 'right',
        verticalAlign: 'middle',
        borderWidth: 0,

    },
    series:[{
            name: totalData[0].is,
            data: [7.0, 6.9, 9.5, 14.5, 18.2, 21.5, 25.2, 26.5, 23.3, 18.3, 13.9, 9.6]
        }]
  });

  var postID = newPostRef.key();
  console.log("ID = "+postID);


}
