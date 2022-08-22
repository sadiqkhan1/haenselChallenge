var margin = {top: 10, right: 30, bottom: 30, left: 40},
    width = 460 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;

    var dataViz = document.getElementById('my_dataviz');

var svg = d3.select(dataViz)
  .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");

d3.csv('Dataset1.csv', function(data) {

    console.log(data)
  var x = d3.scaleLinear()
      .domain([0, 1000]) 
      .range([0, width]);
  svg.append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x));

  var histogram = d3.histogram()
      .value(function(d) { return d.price; })
      .domain(x.domain()) 
      .thresholds(x.ticks(70));

  var bins = histogram(data);

  var y = d3.scaleLinear()
      .range([height, 0]);
      y.domain([0, d3.max(bins, function(d) { return d.length; })]);  
  svg.append("g")
      .call(d3.axisLeft(y));

  svg.selectAll("rect")
      .data(bins)
      .enter()
      .append("rect")
        .attr("x", 1)
        .attr("transform", function(d) { return "translate(" + x(d.x0) + "," + y(d.length) + ")"; })
        .attr("width", function(d) { return x(d.x1) - x(d.x0) -1 ; })
        .attr("height", function(d) { return height - y(d.length); })
        .style("fill", "#69b3a2")

});