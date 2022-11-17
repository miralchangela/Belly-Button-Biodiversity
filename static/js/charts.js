function init() {
    // Grab a reference to the dropdown select element
    var selector = d3.select("#selDataset");
  
    // Use the list of sample names to populate the select options
    d3.json("samples.json").then((data) => {
      var sampleNames = data.names;
  
      sampleNames.forEach((sample) => {
        selector
          .append("option")
          .text(sample)
          .property("value", sample);
      });
  
      // Use the first sample from the list to build the initial plots
      var firstSample = sampleNames[0];
      buildCharts(firstSample);
      buildMetadata(firstSample);
    });
  }
  
  // Initialize the dashboard
  init();
  
  function optionChanged(newSample) {
    // Fetch new data each time a new sample is selected
    buildMetadata(newSample);
    buildCharts(newSample);
    
  }
  
  // Demographics Panel 
  function buildMetadata(sample) {
    d3.json("samples.json").then((data) => {
     
      var metadata = data.metadata;
      // Filter the data for the object with the desired sample number
      var resultArray = metadata.filter(sampleObj => sampleObj.id == sample);
      var result = resultArray[0];
      // Use d3 to select the panel with id of `#sample-metadata`
      var PANEL = d3.select("#sample-metadata");
  
      // Use `.html("") to clear any existing metadata
      PANEL.html("");
  
      // Use `Object.entries` to add each key and value pair to the panel
      // Hint: Inside the loop, you will need to use d3 to append new
      // tags for each key-value in the metadata.
      Object.entries(result).forEach(([key, value]) => {
        PANEL.append("h6").text(`${key.toUpperCase()}: ${value}`);
      });
  
    });
  }
  
  //Creating the buildCharts function.
  function buildCharts(sample) {
    // Use d3.json to load the samples.json file 
    d3.json("samples.json").then((data) => {
      console.log(data);
  
      // Create a variable that holds the samples array. 
    var sampleData = data.samples;
      // Create a variable that filters the samples for the object with the desired sample number.
    var sampleArray = sampleData.filter(sampleObject => sampleObject.id == sample);
      // Create a variable that filters the metadata array for the object with the desired sample number.
    var resultArray = data.metadata.filter(sampleObj => sampleObj.id == sample);
      // Create a variable that holds the first sample in the array.
    var sampleList = sampleArray[0];
      // Create a variable that holds the first sample in the metadata array.
    var result = resultArray[0];
    //console.log(result);
      // Create variables that hold the otu_ids, otu_labels, and sample_values.
    var outIDs = sampleList.otu_ids;
    var outLabels = sampleList.otu_labels;
    var sampleValues = sampleList.sample_values;
  
      // Create a variable that holds the washing frequency.
    var washingFreq = result.wfreq; 
    console.log(washingFreq);
      // Create the yticks for the bar chart.
    var sortedValues = sampleValues.slice(0,10).reverse();
    var outIDslist = outIDs.slice(0,10).reverse();
    var yticks = outIDslist.map(data => "OTU " + data);
  
    //Create the trace for the bar chart. 
    var barData = [ {
      x: sortedValues,
      y: yticks,
      type : "bar",
      orientation: "h"
    }  
    ];
    //Create the layout for the bar chart. 
    var barLayout = { 
      title :"Top 10 Bacteria Cultures Found",
      xaxis: { title: "Bacteria Sample Values" },
      yaxis: { title: "OTU IDs" }
      
    };
      // Use Plotly to plot the bar data and layout.
    Plotly.newPlot("bar" , barData , barLayout);
    
    
    // Create the trace for the bubble chart.
    var bubbleData = [{
      x : outIDs,
      y : sampleValues,
      text : outLabels,
      mode: 'markers',
      marker: {
        // Use otu_ids for the marker colors
        color: outIDs,
        // Use sample_values for the marker size
        size: sampleValues,
        colorscale: 'YlOrRd'
              }
    }];
  
    //Create the layout for the bubble chart.
    var bubbleLayout = {
      fontStyle: "bold",
      title :"Bacteria Cultures Per Sample",
      xaxis: { title: "OTU IDs" },
      yaxis: { title: "Bacteria Sample Values" },
      height: 600

      
    };
      // Use Plotly to plot the bubble data and layout.
    Plotly.newPlot("bubble",bubbleData , bubbleLayout);
     
      
      // 4. Create the trace for the gauge chart.
      var gaugeData = [
        {
        domain: { x: [0, 1], y: [0, 1] },
		value: washingFreq,
		title: { text: "Scrubs Per Week" },
		type: "indicator",
		mode: "gauge+number",  
        gauge: {
            
            axis: { range: [null, 10], tickwidth: 2 , tickcolor : "darkblack"},
            bar: { color: "black" },
            bgcolor : "white",
            borderwidth: 2,
            bordercolor: "gray",
            steps: [
            { range: [0, 2], color: "red" },
            { range: [2, 4], color: "orange" },
            { range: [4, 6], color: "yellow" },
            { range: [6, 8], color: "lightgreen" },
            { range: [8, 10], color: "green" },
          ]
        }
        }
      ];
      
      // 5. Create the layout for the gauge chart.
      var gaugeLayout = { 
        title : "Belly Button Washing Frequency"
      };
  
      // 6. Use Plotly to plot the gauge data and layout.
      Plotly.newPlot("gauge", gaugeData , gaugeLayout);
    });
  }
  