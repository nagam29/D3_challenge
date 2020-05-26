// @TODO: YOUR CODE HERE!
// Chart Params
var svgWidth = 960;
var svgHeight = 500;

var margin = { top: 20, right: 40, bottom: 60, left: 50 };

var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;

// Create an SVG wrapper, append an SVG group that will hold our chart, 
// and shift the latter by left and top margins.
var svg = d3
  .select("body")
  .append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight);

//  create  <g> tag 
// Transformations applied to the <g> and its child elements
var chartGroup = svg.append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);


function makeMyGraph(healthData) {

    // create state name, healthcoverage, poverty data array
    stateName=healthData.map(data=>data.state);
    console.log(stateName);
    console.log(healthData);
    healthCoverage=healthData.map(data=>data.healthcarePercent);
    console.log(healthCoverage);   
    povertyRate=healthData.map(data=>data.povertyPercent);
    console.log(povertyRate);

    // scale y to chart height
    var yScale=d3.scaleLinear()
        .domain([0,d3.max(healthCoverage)])
        .range([height,0]);
    
    // scale x to chart width
    var xScale=d3.scaleLinear()
        .domain([0,d3.max(povertyRate)])
        .range([0,width]);

    // create axes
    var yAxis = d3.axisLeft(yScale);
    var xAxis = d3.axisBottom(xScale);

    // set x to the bottom of the chart
    chartGroup.append("g")
    .attr("transform", `translate(0, ${height})`)
    .call(xAxis);

    // set y to the y axis
    chartGroup.append("g")
    .call(yAxis);

    // create circles
    
    chartGroup.selectAll('circle')
        .data(healthData)
        .enter()
        .append('circle')
        .attr('cx',d=> xScale(d.povertyRate))
        .attr('cy',d=> yScale(d.healthCoverage))
        .attr('r','15')
        .attr('fill','blue')
        .attr("opacity", ".5");

}

// Import csv data
// Save only the variables I need

d3.csv(
    '../assets/data/data.csv', 
    function(row){
        return {
            state: row.abbr,
            povertyPercent: +row.poverty, // reformat string to numeric
            healthcarePercent: +row.healthcare // reformat string to numeric
        }

    }
    ).then(makeMyGraph);










// Use myData for creating scales for X and Y

