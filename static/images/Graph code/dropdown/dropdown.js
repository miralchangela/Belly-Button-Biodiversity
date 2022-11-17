d3.selectAll("#menu").on("change", updatePage);

function updatePage() {
  var dropdownMenu = d3.selectAll("#selectOption").node();
  var dropdownMenuID = dropdownMenu.id;
  var selectedOption = dropdownMenu.value;
  var text = dropdownMenu.text;
  console.log(dropdownMenuID);
  console.log(selectedOption);
  console.log(text);
};

function init() {
  
  data = [{
    x: [1, 2, 3, 4, 5],
    y: [1, 2, 4, 8, 16] 
  }];
  Plotly.newPlot("plot", data);
};

d3.selectAll("#selectOption").on("change", updateplotly);

function updateplotly(){

  var dropdownMenu = d3.selectAll("#selectOption").node();
  var dataset = dropdownMenu.value;
  //console.log(dataset);
  var xData = [1,2,3,4,5];
  var yData = [];

  if (dataset === ""){
    yData = [1,2,4,8,16];
  }
  if (dataset === 'dataset2') {
    yData = [1, 10, 100, 1000, 10000];
  };
  
  var trace = {
    x: [xData],
    y: [yData]
  };
  console.log(trace);
  var layout ={
    title : "'line' chart"
  };
  Plotly.restyle("plot", trace , layout);
};
init();
