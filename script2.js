var lst=[{
	name:"diuwuesgdf",
	rating:-832761
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
	let s=document.getElementById('username').value;
	s=s.trim();
	s=s.toLowerCase();
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
	document.getElementById("btnadd").disabled = false;
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
		x={	name : data.result[0]["handle"], rating : data.result[0]["rating"]};
		lst.push(x);
	});
}
function check(list)
{
	list.sort(compare2);
	let a=[];
	let ctr=0;
	for(i=0;i<list.length;i++)
	{
		a.push(list[i]);
		while(i<list.length && list[i]["name"]===a[ctr]["name"])
		{
			i++;
		}
		alert("d"+a[ctr].name);
		ctr++;
	}
	a.sort(compare);
	lst=a;
	alert(lst.length);
}
function add2()
{
	lst.sort(compare);
	let list=lst;
	alert(list[0]["name"]);
	check(list);
	var str="<table>";
	for(i=0;i<lst.length-1;i++)
	{
		if(i%2==0)
		str=str.concat(`<tr><td>${i+1}</td><td>${lst[i]["name"]}</td><td>${lst[i]["rating"]}</td></tr>`);
	else
		str=str.concat(`<tr style='background-color:#f2f2f2'><td>${i+1}</td><td>${lst[i]["name"]}</td><td>${lst[i]["rating"]}</td></tr>`);
	}
	str=str.concat(`</table>`);
	$('.output').html(str);
}
function redirect()
{
	location.replace('https://pratims10.github.io/CF-Rating-Comparator/index.html');
}
