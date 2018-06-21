$(document).ready(function(){	

	d3.csv('data/scimemodata.csv',function(error,data){
		// drawEducationYear(error,data);
		drawCorrelation(data);
	});

});

//used to draw correlation chart
function drawCorrelation(data){

	console.log(data);
	
	//var consololorDomain = d3.keys(data[0]).filter(function(key){return key != "Item";});
	var rawData = [];

	for(var i=0;i< 227;i++){
		var lightCityone = [];
		var rawDataOne = [];
		rawDataOne.push(data[i]['score']);
    	rawDataOne.push(data[i]["meanS"]);
    	rawDataOne.push(data[i]["meanV"]);
    	rawDataOne.push(data[i]["feature congestion"]);
    	rawDataOne.push(data[i]["entropy"]);
    	rawDataOne.push(data[i]["colorfulness"]);
    	rawDataOne.push(data[i]["edges"]);
    	rawDataOne.push(data[i]["coarseness"]);
    	rawDataOne.push(data[i]["contrast"]);
    	rawDataOne.push(data[i]["directionality"]);
    	rawData.push(rawDataOne);
	}

	console.log(rawData);

	var dom = document.getElementById("correlation-box");
    var myChart = echarts.init(dom,'dark');
    var app = {};
    option = null;
    
    var schema = [

        {name: 'score', index: 1, text: 'score'},
        {name: 'meanS', index: 2, text: 'meanS'},
        {name: 'meanV', index: 3, text: 'meanV'},
        {name: 'feature congestion', index: 4, text: 'feature congestion'},
        {name: 'entropy', index: 5, text: 'entropy'},
        {name: 'colorfulness', index: 6, text: 'colorfulness'},
        {name: 'edges', index: 7, text: 'edges'},
        {name: 'coarseness', index: 8, text: 'coarseness'},
        {name: 'contrast', index: 9, text: 'contrast'},
        {name: 'directionality', index: 10, text: 'directionality'}
    ];

    var CATEGORY_DIM_COUNT = 10;
    var GAP = 2;
    var BASE_LEFT = 30;
    var BASE_TOP = 13;
    // var GRID_WIDTH = 220;
    // var GRID_HEIGHT = 220;
    var GRID_WIDTH = (100 - BASE_LEFT - GAP) / CATEGORY_DIM_COUNT - GAP;
    var GRID_HEIGHT = (95 - BASE_TOP - GAP) / CATEGORY_DIM_COUNT - GAP;
    var CATEGORY_DIM = 10;
    var SYMBOL_SIZE = 3;

    function retrieveScatterData(data, dimX, dimY) {
        var result = [];
        //console.log(data);
        for (var i = 0; i < data.length; i++) {
            var item = [data[i][dimX], data[i][dimY]];
            item[CATEGORY_DIM] = data[i][CATEGORY_DIM];
            result.push(item);
        }
        return result;
    }

    function generateGrids(option) {
        var index = 0;

        for (var i = 0; i < CATEGORY_DIM_COUNT; i++) {
            for (var j = 0; j < CATEGORY_DIM_COUNT; j++) {
                if (CATEGORY_DIM_COUNT -i + j >= CATEGORY_DIM_COUNT) {
                    continue;
                }

                option.grid.push({
                    left: BASE_LEFT + i * (GRID_WIDTH + GAP) + '%',
                    top: BASE_TOP + j * (GRID_HEIGHT + GAP) + '%',
                    width: GRID_WIDTH + '%',
                    height: GRID_HEIGHT + '%'
                });

                option.brush.xAxisIndex && option.brush.xAxisIndex.push(index);
                option.brush.yAxisIndex && option.brush.yAxisIndex.push(index);

                option.xAxis.push({
                    name: j === 0 ? schema[i].text : '', 
                    nameLocation: 'middle',
                    position: 'top',
                    axisLine: {
                        show: false,
                        onZero: false
                    },
                    splitLine: {
                        show: false,
                        onZero: false
                    },
                    axisTick: {
                        show: false,
                        inside: true
                    },
                    axisLabel: {
                        show: false
                    },
                    type: 'value',
                    gridIndex: index,
                    scale: true
                });

                option.yAxis.push({
                    name: i === CATEGORY_DIM_COUNT - 1 ? schema[j].text : '',
                    nameLocation: 'middle',                    
                    position: 'right',
                    axisLine: {
                        show: false,
                        onZero: false
                    },
                    splitLine: {
                        show: false,
                        onZero: false
                    },
                    axisTick: {
                        show: false,
                        inside: true
                    },
                    axisLabel: {
                        show: false
                    },
                    type: 'value',
                    gridIndex: index,
                    scale: true
                });

                option.series.push({
                    type: 'scatter',
                    symbolSize: SYMBOL_SIZE,
                    xAxisIndex: index,
                    yAxisIndex: index,

                    data: retrieveScatterData(rawData, i, j)
                });

                option.visualMap.seriesIndex.push(option.series.length - 1);

                index++;
            }
        }
    }


    var option = {
        animation: false,
        brush: {
            brushLink: 'all',
            xAxisIndex: [],
            yAxisIndex: [],
            inBrush: {
                opacity: 1
            }
        },
        visualMap: {
            type: 'piecewise',
            categories: ["low income", "medium income", "high income"],
            dimension: CATEGORY_DIM,
            orient: 'horizontal',
            top: 0,
            left: 'center',
            textStyle:{    
        		color:'#000',
        		fontSize:12
    		},
            inRange: {
                color: ['#f1c40f', '#2ecc71', '#3498db']
            },
            outOfRange: {
                color: '#3498db'
            },
            seriesIndex: [0]
        },
        toolbox:{show:false},
        tooltip: {
            show:false,
            trigger: 'item'
        },
        parallelAxis: [
            {dim: 0, name: schema[0].text},
            {dim: 1, name: schema[1].text},
            {dim: 2, name: schema[2].text},
            {dim: 3, name: schema[3].text},
            {dim: 4, name: schema[4].text},
            {dim: 5, name: schema[5].text},
            {dim: 6, name: schema[6].text}
            // {
            //     dim: 6, name: schema[6].text,
            //     type: 'category', data: ["low income", "medium income", "high income"],
            // }
        ],
        parallel: {
            bottom: '10%',
            left: '5%',
            height: '35%',
            width: '50%',
            parallelAxisDefault: {
                type: 'value',
                name: 'Income Analysis',
                nameLocation: 'end',
                nameGap: 20,
                splitNumber: 3,
                nameTextStyle: {
                    fontSize: 14
                },
                axisLine: {
                    lineStyle: {
                        color: '#aaa'
                    }
                },
                axisTick: {
                    lineStyle: {
                        color: '#aaa'
                    }
                },
                splitLine: {
                    show: false
                },
                axisLabel: {
                    textStyle: {
                        color: '#aaa'
                    }
                }
            }
        },
        grid: [],
        xAxis: [],
        yAxis: [],
        series: [
            {
                name: 'parallel',
                type: 'parallel',
                smooth: true,
                lineStyle: {
                    normal: {
                        width: 1,
                        opacity: 0.6
                    }
                },
                data: rawData
            }
        ]
    };

    generateGrids(option);
    myChart.setOption(option, true);


}