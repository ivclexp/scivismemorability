//present images
$(document).ready(function(){	

	d3.csv('data/finalresult3.csv',function(error,data){
		showVisualization(data);
	});


	

});



function showVisualization(data){
	console.log(data);
	for(var i =0;i< data.length;i++){
		var img_url = data[i].url;
		var img_score = data[i].score;
		var outer_div = document.createElement("div");
		outer_div.className = "col-lg-3 col-md-4 col-xs-6";
		outer_div.innerHTML = '<div class="panel panel-default"><div class="panel-thumbnail img-panel"><a href="#" class="d-block mb-4 h-100"><img class="img-fluid img-thumbnial" src='+img_url+' alt=""></a></div><div class="panel-body" id="score-panel"><p class="score-text">score: '+img_score+'</p></div></div>';
		document.getElementById("image-gallery").appendChild(outer_div);

	}
}

