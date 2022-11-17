// just give the whole sample data
d3.json("samples.json").then(function(data){
    console.log(data);
});
// using this method ,we can get only wfreq from sample.json
d3.json("samples.json").then(function(data){
    wfreq = data.metadata.map(person => person.wfreq);
    console.log(wfreq);
});
// this code is used to sort the wfreq array in descending order.
d3.json("samples.json").then(function(data){
    wfreq = data.metadata.map(person =>
person.wfreq).sort((a,b) => b - a);
    console.log(wfreq);
});
// to remove a null values from wfreq data
d3.json("samples.json").then(function(data){
    wfreq = data.metadata.map(person =>
person.wfreq).sort((a,b) => b - a);
    filteredWfreq = wfreq.filter(value => value !=
null);
    console.log(filteredWfreq);
});
//we can display the metadata of any individual from the dataset
d3.json("samples.json").then(function(data){
    firstperson = data.metadata[0];
    console.log(firstperson);
    Object.entries(firstperson).forEach(([key,value])=> {console.log(key + ': ' + value);});
});
