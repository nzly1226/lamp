

function timeS(value){
	var date = new Date(value);
    const Y = date.getFullYear() + '-';
    const M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
    const D = (date.getDate() < 10 ? '0'+date.getDate() : date.getDate()) + ' ';
    const h = (date.getHours() < 10 ? '0'+date.getHours() : date.getHours()) + ':';
    const m = (date.getMinutes() < 10 ? '0'+date.getMinutes() : date.getMinutes()) + ':';
    const s = (date.getSeconds() < 10 ? '0'+date.getSeconds() : date.getSeconds());
    return (Y+M+D+h+m+s);
}

function back(){
	console.log("back");
	var url = "https://github.com/nzly1226/lamp.git";
}

function nav(item,txtContent,logo,user){
	console.log(item,txtContent,logo,user);

	var div = document.getElementById("nav");
	div.setAttribute("class","col-md-3 left_col leftnav");
	div.style.position = "fixed";

	var div2 = document.createElement("div");
	div2.setAttribute("class","scroll-view");

	var div3 = document.createElement("div");
	div3.setAttribute("class","navbar nav_title border_nav");

	var a = document.createElement("a");
	a.setAttribute("class","site_title");

	var span = document.createElement("span");

	if(logo!=""||logo!=null){
		var img = document.createElement("img");
		img.src=logo;
		img.height = 30;
		span.appendChild(img);
	}
	else{
		var i = document.createElement("i");
		i.setAttribute("class","fa icon-icon iconfont");
		var span1 = document.createElement("span");
		span1.innerText = txtContent;
		span.appendChild(i);
		span.appendChild(span1);
	}

	a.appendChild(span);
	div3.appendChild(a);
	div2.appendChild(div3);
	

	var div4 = document.createElement("div");
	div4.setAttribute("class","clearfix");

	div2.appendChild(div4);

	var div5 = document.createElement("div");
	div5.setAttribute("class","profile clearfix");

	var div6 = document.createElement("div");
	div6.setAttribute("class","profile_pic");

	var img1 = document.createElement("img");
	img1.src = "data:image/png;base64,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";
	img1.setAttribute("class","img-circle profile_img");

	div6.appendChild(img1);

	var div7 = document.createElement("div");
	div7.setAttribute("class","profile_info");

	var span2 = document.createElement("span");
	span2.innerText = txtContent;

	var h2 = document.createElement("h2");
	h2.innerText = "欢迎，"+user;

	var br = document.createElement("br");

	div7.appendChild(span2);
	div7.appendChild(h2);
	div5.appendChild(div6);
	div5.appendChild(div7);
	div2.appendChild(div5);
	div2.appendChild(br);

	var  div8 = document.createElement("div");
	div8.setAttribute("class","main_menu_side hidden-print main_menu");
	div8.setAttribute("id","sidebar-menu");

	var div9 = document.createElement("div");
	div9.setAttribute("class","menu_section");

	var ul = document.createElement("ul");
	ul.setAttribute("class","nav side-menu");

	for(var i=0;i<item.length;i++){
		var li = document.createElement("li");
		var a1 = document.createElement("a");
		var i1 = document.createElement("i");
		i1.setAttribute("class","fa iconfont");
		console.log(i1);
		i1.classList.add(item[i].icon);
		var span3 = document.createElement("span");
		span3.setAttribute("class","fa fa-chevron-down");
		var span4 = document.createElement("span");
		span4.innerText = item[i].name;
		a1.appendChild(i1);
		a1.appendChild(span4);
		a1.appendChild(span3);
		li.appendChild(a1);
		var ul1 = document.createElement("ul");
		ul1.setAttribute("class","nav child_menu");
		for(var n = 0;n<item[i].list.length;n++){
			var li1 = document.createElement("li");
			var routerLink = document.createElement("a");
			routerLink.innerText = item[i].list[n].name;
			let url = window.location.href.split("#/");
			console.log(url);
			var url1 = url[0];
			console.log(url1);
			routerLink.href = url1 + "#" + item[i].list[n].url;
			li1.appendChild(routerLink);
			ul1.appendChild(li1);
		}
		li.appendChild(ul1);
		ul.appendChild(li);
	}

	div8.appendChild(div9);
	div9.appendChild(ul);
	div2.appendChild(div8);
	div.appendChild(div2);
	console.log(div);
	return div;
}

function toplist(user,danger,count,showDanger){
	console.log(user,danger,count);
	
	var div = document.getElementById("top");
	div.setAttribute("class","top_nav");

	var div1 = document.createElement("div");
	div1.setAttribute("class","nav_menu");

	var nav1 = document.createElement("nav");

	//div1.appendChild(nav);

	var div2 = document.createElement("div");
	var a = document.createElement("a");
	var i = document.createElement("i");
	div2.setAttribute("class","nav toggle");
	a.setAttribute("id","menu_toggle");
	i.setAttribute("class","fa fa-bars");
	a.appendChild(i);
	div2.appendChild(a);
	nav1.appendChild(div2);

	var ul = document.createElement("ul");
	ul.setAttribute("class","nav navbar-nav navbar-right");

	var li = document.createElement("li");
	var a1 = document.createElement("a");
	a1.setArttibute("class","user-profile dropdown-toggle");
	a1.dataset.toggle = "dropdown";
	var img = document.createElement("img");
	img.src="data:image/png;base64,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";
	var span = document.createElement("span");
	span.innerText = user;
	var span1 = document.createElement("span");
	span1.setArttibute("class","fa fa-angle-down");
	a1.appendChild(img);
	a1.appendChild(span);
	a1.appendChild(span1);
	li.appendChild(a1);
	var ul1 = document.createElement("ul");
	ul1.setArttibute("class","dropdown-menu dropdown-usermenu pull-right");
	var li1 = document.createElement("li");
	var a2 = document.createElement("a");
	var i1 = document.createElement("i");
	i1.setArttibute("class","fa fa-sign-out pull-right");
	var span2 = document.createElement("span");
	span2.innerText = "退出";
	a2.onclick = back();
	a2.appendChild(i1);
	a2.appendChild(span2);
	li1.appendChild(a2);
	ul1.appendChild(li1);
	li.appendChild(ul1);

	var li2 = document.createElement("li");
	li2.setArttibute("class","dropdown");
	li2.role = "presentation";
	var a3 = document.createElement("a");
	a3.setArttibute("class","dropdown-toggle info-number");
	a3.dataset.toggle = "dropdown";
	var i2 = document.createElement("i");
	i2.setArttibute("class","iconfont");
	i2.innerText = "&#xe608;";
	var span3 = document.createElement("span");
	span3.setArttibute("class","badge bg-green");
	span3.innerText = count;
	var audio = document.createElement("audio");
	audio.setArttibute("id","auto");
	autio.src = "static/警报.wav";
	audio.controls = "controls";
	audio.hidden = true;
	a3.appendChild(i2);
	a3.appendChild(span3);
	a3.appendChild(audio);
	li2.appendChild(a3);
	if(showDanger = true){
		var url2 = document.createElement("ul");
		url2.setArttibute("id","menu1");
		url2.setArttibute("class","dropdown-menu list-unstyled msg_list");
		url2.role = "menu";
		if(danger.length>0){
			for(var i = 0;i<danger.length;i++){
				var li3 = document.createElement("li");
				var routerLink = document.createElement("a");
				routerLink.innerText = item[i].list[n].name;
				let url = window.location.href.split("#/");
				console.log(url);
				var url1 = url[0];
				console.log(url1);
				routerLink.href = url1 + "#/danger/realtime";
				var spanli1 = document.createElement("span");
				spanli1.setArttibute("class","image");
				var spanimg = document.createElement("img");
				spanimg.src = 'data:image/png;base64,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';
				spanimg.alt = "Profile Image"
				spanli1.appendChild(spanimg);
				var spanli2 = document.createElement("span");
				var spanli21 = document.createElement("span");
				spanli21.innerText = user;
				var spanli22 = document.createElement("span");
				spanli22.setArttibute("class","time");
				var time = timeS(danger[i].alarmTime);
				spanli22.innerText = time;
				spanli2.appendChild(spanli21);
				spanli2.appendChild(spanli22);
				var spanli3 = document.createElement("span");
				spanli3.setAttribute("class","message");
				spanli3.innerText = "设备名称：" + danger[i].device.deviceName + "，详情：" + danger[i].alarmCode + '!';
				routerLink.append(spanli1);
				routerLink.append(spanli2);
				routerLink.append(spanli3);
				li3.appendChild(routerLink);
				ul2.appendChild(li3);
			}
		}
		li2.appendChild(url2);
	}

	if(danger.length>0){
		var li4 = document.createElement("li");
		var a4 = document.createElement("a");
		a4.setArttibute("class","dropdown-toggle info-number");
		
	}
}