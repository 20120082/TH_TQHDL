var svg = d3.select("svg");

[{height: 10, width: 10}, {height: 20, width: 20}];

var rect = svg
    .append('rect')
    .attr("height", 100)
    .attr("width", 100)
    .style("fill", 'red');


rect.style("fill", "purple");

//d3.select("rect").style("fill", "green");

