var lst=[{
	name:"diuwuesgdf",
	rating:-832761,
	rank:"nothing",
	maxrating:-993282,
	maxrank:"nothing",
	contri:-9283121,
	photo:"adhhag"	
	}
];
function compare(a,b)
{
	if(a.rating>b.rating)
		return -1;
	else return 1;
}
function compare2(a,b)
{
	if(a.name>b.name)
		return -1;
	else return 1;
}
function add()
{
	document.getElementById("btnadd").disabled = true;
	$('#btnadd').addClass("disable");
	let s=document.getElementById('username').value;
	s=s.trim();
	s=s.toLowerCase();
	if(s=="")
	{
		alert("Please enter an username");
		setTimeout(function(){
  		document.getElementById("btnadd").disabled = false;
  		$('#btnadd').removeClass("disable");
	}, 1000);
		return ;
	}
	let flag=true;
	for(i=0;i<lst.length;i++)
	{
		if(lst[i]["name"].toLowerCase()==s)
			flag=false;
	}
	if(flag==true)
	{
		add1();
		add2();
	}
	else
	{
		add2();
	}
	setTimeout(function(){
  		document.getElementById("btnadd").disabled = false;
  		$('#btnadd').removeClass("disable");
	}, 1000);
}
function add1()
{
	var u1=document.getElementById('username').value;
	u1=u1.trim();
	let x;
	$.getJSON(`https://codeforces.com/api/user.info?handles=${u1}`, function(data) {
		if(data.status[0]=="FAILED")
		{
			alert("Some error occured");
			return ;
		}
		x={	name : data.result[0]["handle"],
		rating : data.result[0]["rating"],
		rank:data.result[0]["rank"],
		maxrating:data.result[0]["maxRating"],
		maxrank:data.result[0]["maxRank"],
		contri:data.result[0]["contribution"],
		photo:data.result[0]["titlePhoto"]
	};
		lst.push(x);
	});
}
function add2()
{
	lst.sort(compare);
	var str="<table style='margin-left:-20%;width:90%'><tr><td></td><td><b>Rank</b></td><td><b>Username</b></td><td><b>Current Rating</b></td><td><b>Max Rating</b></td><td><b>Rank</b></td><td><b>Max Rank</b></td><td><b>Contribution</b></td></tr>";
	for(i=0;i<lst.length-1;i++)
	{
		if(i%2==0)
			str=str.concat(`<tr>`);
		else
			str=str.concat(`<tr style='background-color:#f2f2f2'>`);
		str=str.concat(`<td><a href='https://codeforces.com/profile/${lst[i]["name"]}' target='_blank'><img height="37px" width="37px" style='border-radius:50%' src='https://${lst[i]["photo"]}'></a></td>`);
		str=str.concat(`<td>${i+1}</td><td><a style="text-decoration:none" href='https://codeforces.com/profile/${lst[i]["name"]}' target='_blank'><b>${lst[i]["name"]}</b></a></td><td>${lst[i]["rating"]}</td>`);
		str=str.concat(`<td>${lst[i]["maxrating"]}</td><td>${lst[i]["rank"]}</td><td>${lst[i]["maxrank"]}</td>`);
		str=str.concat(`<td>${lst[i]["contri"]}</td></tr>`);
	}
	str=str.concat(`</table>`);
	$('.output').html(str);
}
function redirect()
{
	location.replace('https://pratims10.github.io/CF-Rating-Comparator/index.html');
}

function clear2()
{
	lst=[];
	lst.push({
	name:"diuwuesgdf",
	rating:-832761,
	rank:"nothing",
	maxrating:-993282,
	maxrank:"nothing",
	contri:-9283121,
	photo:"adhhag"	
	});
	$('.output').html("");
}
