var trace = {
    x: ["burrito", "pizza", "chicken"],
    y: [10, 18, 5],
    type: "bar"
 };

 var layout = {
    title: "Lunch Survey",
    xaxis: {title :"Food Options"},
    yaxis : {title :"number of respondents"}
 };

 Plotly.newPlot("plotArea1", [trace] , layout);