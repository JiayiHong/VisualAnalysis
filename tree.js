
// var width = document.getElementById("#tree").offsetWidth
// var height = document.getElementById("#tree").offsetHeight

var width = 960, height = 500;

var x = d3.scale.linear().range([0, width]);
var y = d3.scale.linear().range([0, height]);

var color = d3.scale.category20c();

var partition = d3.layout.partition()
    .children(function(d) {return isNaN(d.value) ? d3.entries(d.value):null;})
    .value(function(d) {return d.value;});

var svg = d3.select("#tree").append("svg:svg")
    .attr("width", width)
    .attr("height", height);

// var rect = svg.selectAll("rect");

d3.json("sample.json", function(json) {
    // if (error) throw error;
    var data = partition(d3.entries(json));
    console.log(data);
    var rect = svg.selectAll("rect").data(data).enter()
        .append("svg:rect")
        .attr("x", function(d) {return x(d.x);})
        .attr("y", function(d) {return y(d.y);})
        .attr("width", function(d) {return x(d.dx);})
        .attr("height", function(d) {return y(d.dy);})
        .style("cursor", "pointer")
        .attr("fill", function(d) {return color(d.key);})
        .on("click", click);
    // rect = rect.data(partition(d3.entries(root)[0]));
    //     .enter().append("rect")
    //     .attr("x", function(d) {return x(d.x);})
    //     .attr("y", function(d) {return y(d.y);})
    //     .attr("width", function(d) {return x(d.dx);})
    //     .attr("height", function(d) {return y(d.dy);})
    //     .attr("fill", function(d) {return color((d.children ? d : d.parent).key);})
    //     .on("click", clicked);

    function click(d){
        x.domain([d.x, d.x+d.dx]);
        y.domain([d.y, 1]).range([d.y ? 20 : 0, height]);
        rect.transition()
            .duration(750)
            .attr("x", function(d) { return x(d.x); })
            .attr("y", function(d) { return y(d.y); })
            .attr("width", function(d) { return x(d.x + d.dx) - x(d.x); })
            .attr("height", function(d) { return y(d.y + d.dy) - y(d.y); });
    }
});



