function showcomparisonbar(u1,u2,rt1,rt2,mrt1,mrt2)
{
	var chart = new CanvasJS.Chart("chartContainer", {
	animationEnabled: true,
	title:{
		text:`Comparison of ${u1} vs ${u2}`
	},
	axisY: {
		title: `Rating`,
		titleFontColor: "#4F81BC",
		lineColor: "#4F81BC",
		labelFontColor: "#4F81BC",
		tickColor: "#4F81BC"
	},
	toolTip: {
		shared: true
	},
	legend: {
		cursor:"pointer",
		itemclick: toggleDataSeries
	},
	data: [{
		type: "column",
		name: `${u1}`,
		legendText: `${u1}`,
		showInLegend: true, 
		dataPoints:[
			{ label: "Current Rating", y: rt1 },
			{ label: "Maximum Rating", y: mrt1 }
		]
	},
	{
		type: "column",
		name: `${u2}`,
		legendText: `${u2}`,
	//	axisYType: "secondary",
		showInLegend: true,
		dataPoints:[
			{ label: "Rating", y: rt2 },
			{ label: "Max Rating", y: mrt2 }
		]
	}]
});
chart.render();
function toggleDataSeries(e) {
	if (typeof(e.dataSeries.visible) == "undefined" || e.dataSeries.visible) {
		e.dataSeries.visible = false;
	}
	else {
		e.dataSeries.visible = true;
	}
	chart.render();
}
}
   	function myfunc(){
 //   	console.log("asa");
		var u1=document.getElementById('user1').value;
		var u2=document.getElementById('user2').value;
		var rt1,rt2,mrt1,mrt2;
	    $.getJSON(`https://codeforces.com/api/user.info?handles=${u1};${u2}`, function(data) {
	    	rt1=data.result[0]["rating"];
	    	rt2=data.result[1]["rating"];
			mrt1=data.result[0]["maxRating"];
	    	mrt2=data.result[1]["maxRating"];
	        if(data.status!='OK')
	        {
	        	alert("Sorry, some error has occured.");
	        }
	        else
	        {
		        var str="";
		        str=str.concat('<table style="width:50%; font-family:Sans-serif;margin-left:0%">');
		        str=str.concat(`<tr style='background-color:#f2f2f2'><td>&nbsp;&nbsp;&nbsp;Username</td><td>`);
		        str=str.concat(`<b>${u1}</b></td><td><b>${u2}</b></td></tr>`);
		        str=str.concat(`<tr'><td>&nbsp;&nbsp;&nbsp;Current Rating</td><td>`);
		        //rating
		        str=str.concat(`${rt1}</td><td>${rt2}</td></tr>`);
		        str=str.concat(`<tr style='background-color:#f2f2f2'><td>&nbsp;&nbsp;&nbsp;Max Rating</td><td>`);
		        str=str.concat(`${mrt1}</td><td>${mrt2}</td></tr>`);
		        str=str.concat(`<tr><td>&nbsp;&nbsp;&nbsp;Current Rank</td><td>`);
		        str=str.concat(`<b>${data.result[0]["rank"]}</b></td><td><b>${data.result[1]["rank"]}</b></td></tr>`);
		        str=str.concat(`<tr style='background-color:#f2f2f2'><td>&nbsp;&nbsp;&nbsp;Max Rank</td><td>`);
		        str=str.concat(`<b>${data.result[0]["maxRank"]}</b></td><td><b>${data.result[1]["maxRank"]}</b></td></tr>`);
		        str=str.concat('</table>');
			    showcomparisonbar(u1,u2,rt1,rt2,mrt1,mrt2);
		        $(".mypanel").html(str);
		        document.getElementById('chartContainer').scrollIntoView();
	    	}
	    });
//	    console.log("A");
	}
function redirect()
{
	location.replace('https://pratims10.github.io/CF-Rating-Comparator/compare.html');
}
