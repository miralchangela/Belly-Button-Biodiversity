function init(){
var subjectId = d3.select("#selDataset");

d3.json("samples.json").then((data)=>
{
    console.log(data);
    var sampleNames = data.names;
    //console.log(sampleNames);
    sampleNames.forEach(element => {
        subjectId
        .append("option")
        .text(element)
        .property("value" , element);
      
    });
}
)};
init();
function optionChanged(newSample) {
    // console.log(newSample);
    buildMetadata(newSample);
  };

function buildMetadata(sample) {
    d3.json("samples.json").then(data => 
        {
            var metadata = data.metadata;
            var resultArray = metadata.filter(sampleObj => sampleObj.id == sample);
            var result = resultArray[0];
            Object.entries(result).forEach(([key,value]) => {
                console.log(key , value);
                    });
    });
};







 