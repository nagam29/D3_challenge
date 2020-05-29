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


d3.csv('assets/data/data.csv').then(function(data) {
        data.forEach(d => {
            d.state = d.abbr,
            d.poverty = +d.poverty,
            d.healthcare = +d.healthcare
            console.log(d.poverty);
        });

    // scale y to chart height
    var yScale=d3.scaleLinear()
        .domain([0,d3.max(data, d => d.healthcare)])
        .range([height,0]);
    
    // scale x to chart width
    var xScale=d3.scaleLinear()
        .domain([7,d3.max(data, d => d.poverty)])
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
    var circleGroup=chartGroup.selectAll('circle').data(data).enter()
    circleGroup.append("circle")
        .attr("cx", d => xScale(d.poverty))
        .attr("cy", d => yScale(d.healthcare))
        .attr('r','15')
        .attr('fill','blue')
        .attr("opacity", ".5");

        circleGroup.append("text")
        .text(function(d){
            return d.abbr;
        })
        .attr("dx", d => xScale(d.poverty))
        .attr("dy", d => yScale(d.healthcare)+10/2.5)
        .attr("font-size","11")
        .attr("class","stateText");


    // add axis label
    // reference: Helder da Rocha(2019). "Learn D3.js". Packt>. 
    // Xaxis label
    d3.select('svg')
        .append('text')
        .attr('class','label')
        .attr("transform", `translate(${width / 2}, ${height + margin.top + 40})`)
        .text("Rate of Poverty");
    
    // y axis label
    d3.select('svg')
        .append('text')
        .attr('class','label')   
        .attr('transform',`translate(${[20,(height/1.5)]}) rotate(270)`)
        .text('Lack of Healthcare');
    
});




