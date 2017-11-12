//Width and height
var width = 960,
height = 600,
scale_thousand = 1000,

//Centre County is the geographical center of Pennsylvania.
centre_county = [-77.82, 40.91];


//Define map projection
var projection = d3.geo.mercator()
                       .scale([scale_thousand * 7])
                       .center(centre_county);


//Create SVG element
var svg_map_pa = d3.select(".wpd3-520-0")
			.append("svg")
			.attr("width", width)
			.attr("height", height);


//Define path generator
var path = d3.geo.path()
             .projection(projection);


//Load GeoJSON data
d3.json("http://www.gary-pang.com/wp-content/uploads/2014/11/pa_counties.json", function(json){

    //Bind data and create one path per GeoJSON feature
    svg_map_pa.selectAll("path")
       .data(json.features)
       .enter()
       .append("path")
       .attr("d", path)
       .attr("fill", "#4b4a47")
       .attr("stroke-width", .5)
       .attr("stroke", "#f5f5f5")

       .on("mousemove", function(d) {

       //Update the tooltip position and value
       d3.select("#tooltip")
       .style("top", (d3.event.pageY) + 20 + "px")
       .style("left", (d3.event.pageX) + 20 + "px")

       .select("#value")
       .text(d.properties.NAME);


       //Show the tooltip
       d3.select("#tooltip").classed("hidden", false);
       })

       .on("mouseout", function() {
       //Hide the tooltip
       d3.select("#tooltip").classed("hidden", true);
       });
});
