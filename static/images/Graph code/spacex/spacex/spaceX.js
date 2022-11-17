const url = "https://api.spacexdata.com/v2/launchpads";

d3.json(url).then(receivedData => console.log(receivedData));

//d3.json(url).then(spaceXResults => console.log(spaceXResults[0].full_name));


//d3.json(url).then(spaceXResults => );

d3.json(url).then(function(spaceXdata){
  latitude = spaceXdata.map(data=> data.location.latitude);
  longitude = spaceXdata.map(data => data.location.longitude);
  console.log(latitude,longitude);
});
