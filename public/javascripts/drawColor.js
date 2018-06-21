$(document).ready(function(){	

	$('#x-select').on('change', function() {
  		//get x value and y value
  		var xValue = $('#x-select').val();
  		var yValue = $('#y-select').val();
  		d3.csv('data/finalresult3.csv',function(error,data){
			drawHueCorrelation(data,xValue,yValue);
		});
	})
	$('#y-select').on('change', function() {
  		//get x value and y value
  		var xValue = $('#x-select').val();
  		var yValue = $('#y-select').val();
  		d3.csv('data/finalresult3.csv',function(error,data){
			drawHueCorrelation(data,xValue,yValue);
		});
	})

	// $('#dataset-select').on('change', function() {
 //  		//get x value and y value
 //  		var xValue = $('#x-select').val();
 //  		var yValue = $('#y-select').val();
 //  		var 
 //  		d3.csv('data/finalresult3.csv',function(error,data){
	// 		drawHueCorrelation(data,xValue,yValue);
	// 	});
	// })


	d3.csv('data/finalresult3.csv',function(error,data){
		drawHueCorrelation(data,'colorfulness','score');
	});

	// d3.csv('data/borkinresult2.csv',function(error,data){
	// 	drawHueCorrelation(data);
	// });

});



function drawHueCorrelation(data,xLabel,yLabel){

	d3.select("#svgcorr").remove();

	var margin = {top: 20, right: 20, bottom: 20, left: 20},
    width = 320 - margin.left - margin.right,
    height = 320 - margin.top - margin.bottom;

	data.forEach(function(d) {
      	d.x = parseFloat(d[xLabel]);
      	d.y = parseFloat(d[yLabel]);
      	d.h = parseFloat(d.meanH);
      	d.s = parseFloat(d.meanS);
      	d.v = parseFloat(d.meanV);
      	d.url = d.url;
  	});

	//scale
	var xLowest = d3.min(data,function(d){
		return d.x;
	})
	var xHighest = d3.max(data,function(d){
		return d.x;
	})
	var yLowest = d3.min(data,function(d){
		return d.y;
	})
	var yHighest = d3.max(data,function(d){
		return d.y;
	})
	// var yLowest = 0;
	// var yHighest = 3.2


	var x = d3.scaleLinear()
		.domain([xLowest,xHighest])
		.range([0,width])

	var y = d3.scaleLinear()
		.domain([yLowest,yHighest])
		.range([height,0])

	//tips
 	// tip = d3.tip().attr('class', 'd3-tip').html(function(d) { 

 	// 	var url = d.url;
 	// 	return "<img src="+url+" style='width:28px; height:28px'>";
 	// 	//<img src="public/image/0.png" style="width: 160px; height: 160px;">
 	// 	//style="width: 160px; height: 160px;">"
 	// 	//return "<strong>"+d.url+": </strong> <span style='color:red'>$" +  "</span>";
 	// });

 	var plot = "corr";

	var svg = d3.select('#corre-result-box').append("svg")
		.attr("id",function(d,i){
			return "svg"+plot;
		})
		.attr("class","svg")
		.attr("width",380)
		.attr("height",400)
		.append("g")
    	.attr("transform", "translate(" + 80 + "," + margin.top + ")");

	// svg.append("rect")
 //    .attr("width", "100%")
 //    .attr("height", "100%")
 //    .attr("fill", "#fff")
 //    .attr("transform", "translate(" + -60 + "," + -80 + ")");


	// svg.append("g")
 //    	.attr("transform", "translate(" + 80 + "," + margin.top + ")");;

    var xAxis = d3.axisBottom(x);
    var yAxis = d3.axisLeft(y)

    svg.append("g")
		.attr("transform", "translate(0,280)")
      	.call(xAxis)
      .append("text")
      .style("font-size","2rem")
      .attr("fill", "#000")
      .attr("x",160)
      .attr("y", 25)
      .attr("dy", "0.71em")
      .attr("text-anchor", "end")
      .text(xLabel);

    svg.append("g")
		.attr("transform", "translate(0,0)")
      	.call(yAxis)
      .append("text")
      .style("font-size","2rem")
      .style("font-family","Arial")
      .attr("fill", "#000")
      .attr("transform", "rotate(-90)")
      .attr("x",-100)
      .attr("y", -50)
      .attr("dy", "0.71em")
      .attr("text-anchor", "end")
      .text(yLabel);


    var points = svg.selectAll('.dot')
	.data(data)
	.enter()
	.append('circle')
	.attr('cx', function(d,i) {
		return x(d.x);
	})	
	.attr('cy', function(d) {
		return y(d.y);
	})	
	.on("mouseover",function(d,i){
        d3.select(this).attr("r",5);
        d3.select(this).style("opacity","0.9");
        d3.select(this).style("cursor", "pointer"); 
        $('.origin-img').attr("src",d.url);
        //console.log(d);
        //$('#imageLabel').text(d.Label);
        //tip.show(d,i);
    })
    .on("mouseout",function(){
        d3.select(this).attr("r",5);
        d3.select(this).style("opacity","0.9");
        d3.select(this).style("cursor", "default"); 
        //tip.hide();
    })
	.style("fill",function(d,i){
		// var h = d.h;
		// console.log(d.h,d.s,d.v);
		return '#4684b1';
		//return d3.hsv(d.h*360,d.s,d.v);
		//return '#63a367';
	})
	.style("opacity","0.8")
	.attr('r', 5);

}