$(document).ready(function () {
	//1. show all visualization ordered by memorability score
	d3.csv('public/data/Scimem Dataset.csv', function (error, data) {
		showReference(data);
	});

	



});

function showReference(data) {

	globalImgInfo = data;

	for (var i = 0; i < data.length; i++) {
		var img_thumburl = data[i].thumburl;
		var img_url = data[i].url;
		var img_score = data[i].score;
		//var outer_div = document.createElement("div");
		//souter_div.className = "col-md-2 image-div";
		//outer_div.innerHTML = '<div class="card image-grid"><div class="panel-thumbnail img-panel"><a target="blank" href=' + img_url + ' class="d-block mb-3  image-a"><img class="img-fluid img-thumbnial" src=' + img_thumburl + ' alt=""></a></div><div class="card-body" id="score-panel"><p class="score-text">score: ' + img_score + '</p></div></div>';
		// outer_div.innerHTML = '<div class="card image-grid">'+
		// '<div class="panel-thumbnail img-panel">'+
		// '<a target="blank" href=' + img_url + ' class="d-block mb-3  image-a">'+
		// '<img class="img-fluid img-thumbnial" src=' + img_thumburl + 
		// ' alt=""></a></div><div class="card-body" id="score-panel">'+
		// '<p class="score-text">score: ' + img_score + '</p></div></div>';
		// outer_div.innerHTML = '<div class="card image-grid">' +
		// 	'<div class="panel-thumbnail img-panel">' +
		// 	'<div class="d-block mb-3  image-a" id=' + 'thumb' + i + '>' +
		// 	'<img class="img-fluid img-thumbnial" src=' + img_thumburl +
		// 	' alt=""></div></div><div class="card-body" id="score-panel">' +
		// 	'<p class="score-text">score: ' + img_score + '</p></div></div>';
		// document.getElementById("image-gallery").appendChild(outer_div);

		var refe_list = document.createElement("div");
        refe_list.innerHTML = '<span>['+(i+1)+'] '+data[i]['Author']+', '+data[i]['Paper Title']+ 
        '<span class="italy-font">'+
        '. IEEE Transactions on Visualization and Computer Graphics, '+'</span>'+
        data[i]['First Page'] + '-' + data[i]['Last Page']+ ', ' + 
        data[i]['Year']+ ', ' + '<a target="blank" href='+ data[i]['Paper URL'] +'>' + data[i]['Paper DOI'] +
        '</a></span><br>';
		document.getElementById("refer-container").appendChild(refe_list);
    }
}