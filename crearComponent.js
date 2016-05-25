var totalData = [];

document.getElementById("button").onclick = function() {


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
        yAxis: yAxis,
        xAxis: xAxis
    });


    var series_split = totalData[0].series.split(",");
    var axis_split = totalData[0].xAxis.split(",")



    if (series_split.length != axis_split.length) {
        alert("series i xAxis han de tenir la mateixa longitud");
        totalData = [];
    } else {
        series_split.forEach(function(element, index, array) {
            if (isNaN(element)) {
                alert("Error a series : No tots són núḿeros");
                totalData = [];
            }
        });

    }

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
            categories: totalData[0].xAxis.split(",")
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
        series: [{
            name: totalData[0].is,
            data: totalData[0].series.split(",").map(Number)
        }]
    });

    var postID = newPostRef.key();
    console.log("ID = " + postID);
    console.log(totalData[0].xAxis.split(","));


    window.setTimeout(function() {

        window.location.href = "http://localhost/Projecte_final/rest.html";

    }, 5000);


};
