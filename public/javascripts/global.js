//current image index
var currentImg = 0;

$(document).ready(function () {
	//1. show all visualization ordered by memorability score
	d3.csv('public/data/Scimem Dataset.csv', function (error, data) {
		showVisualization(data);
	});

	//2. draw correlation
	d3.csv('public/data/Scimem Dataset.csv',function(error,data){
		drawCorrelation(data,'colorfulness2','score');
	});

	//3. blind event on ratio change
	$('#x-select').on('change', function () {
		//get x value and y value
		var xValue = $('#x-select').val();
		var yValue = $('#y-select').val();
		var filename = $("input[name='datasetratio']:checked").val();
		var filepath = 'public/data/' + filename +'.csv';
		d3.csv(filepath, function (error, data) {
			drawCorrelation(data, xValue, yValue);
		});
	})
	$('#y-select').on('change', function () {
		//get x value and y value
		var xValue = $('#x-select').val();
		var yValue = $('#y-select').val();
		var filename = $("input[name='datasetratio']:checked").val();
		var filepath = 'public/data/' + filename +'.csv';
		d3.csv(filepath, function (error, data) {
			drawCorrelation(data, xValue, yValue);
		});
	})

	$('#mx-select').on('change', function () {
		//get x value and y value
		var xValue = $('#mx-select').val();
		var yValue = $('#my-select').val();
		var filename = $("input[name='datasetratio']:checked").val();
		var filepath = 'public/data/' + filename +'.csv';
		d3.csv(filepath, function (error, data) {
			drawCorrelation(data, xValue, yValue);
		});
	})
	$('#my-select').on('change', function () {
		//get x value and y value
		var xValue = $('#mx-select').val();
		var yValue = $('#my-select').val();
		var filename = $("input[name='datasetratio']:checked").val();
		var filepath = 'public/data/' + filename +'.csv';
		d3.csv(filepath, function (error, data) {
			drawCorrelation(data, xValue, yValue);
		});
	})

	$('input[type=radio][name=datasetratio]').change(function() {
		if(this.value == 'Scimem Dataset'){
			$('#mx-select').css('display','none');
			$('#my-select').css('display','none');
			$('#x-select').css('display','block');
			$('#y-select').css('display','block');
			var xValue = $('#x-select').val();
			var yValue = $('#y-select').val();
			d3.csv('public/data/Scimem Dataset.csv', function (error, data) {
				drawCorrelation(data, xValue, yValue);
			});
		}
		else if(this.value == 'Massive Dataset'){
			$('#mx-select').css('display','block');
			$('#my-select').css('display','block');
			$('#x-select').css('display','none');
			$('#y-select').css('display','none');
			var xValue = $('#mx-select').val();
			var yValue = $('#my-select').val();
			d3.csv('public/data/Massive Dataset.csv', function (error, data) {
				drawCorrelation(data, xValue, yValue);
			});
		}
	});



});

function showVisualization(data) {
	for (var i = 0; i < data.length; i++) {
		var img_thumburl = data[i].thumburl;
		var img_url = data[i].url;
		var img_score = data[i].score;
		var outer_div = document.createElement("div");
		outer_div.className = "col-md-2 image-div";
		outer_div.innerHTML = '<div class="card image-grid"><div class="panel-thumbnail img-panel"><a target="blank" href='+img_url+' class="d-block mb-3  image-a"><img class="img-fluid img-thumbnial" src=' + img_thumburl + ' alt=""></a></div><div class="card-body" id="score-panel"><p class="score-text">score: ' + img_score + '</p></div></div>';
		document.getElementById("image-gallery").appendChild(outer_div);

	}
}

function drawCorrelation(data,xLabel,yLabel){

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
		return 0;
	})
	var xHighest = d3.max(data,function(d){
		return d.x;
	})
	var yLowest = d3.min(data,function(d){
		return 0;
	})
	var yHighest = d3.max(data,function(d){
		return d.y;
	})


	var x = d3.scaleLinear()
		.domain([xLowest,xHighest])
		.range([0,width])

	var y = d3.scaleLinear()
		.domain([yLowest,yHighest])
		.range([height,0])

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

    var xAxis = d3.axisBottom(x);
    var yAxis = d3.axisLeft(y)

    svg.append("g")
		.attr("transform", "translate(0,280)")
      	.call(xAxis)
      .append("text")
      .style("font-size","1rem")
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
      .style("font-size","1rem")
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
    })
    .on("mouseout",function(){
        d3.select(this).attr("r",5);
        d3.select(this).style("opacity","0.9");
        d3.select(this).style("cursor", "default"); 

    })
	.style("fill",function(d,i){
		return '#4684b1';

	})
	.style("opacity","0.8")
	.attr('r', 5);

}

