// 获取输入的数值
var num=document.getElementById('num');
// 队列容器
var container=document.getElementById('container');
// 获取按钮
var btnleftin=document.getElementById('leftin');
var btnleftout=document.getElementById('leftout');
var btnrightin=document.getElementById('rightin');
var btnrightout=document.getElementById('rightout');

// 队列操作
function moveque(oprator) {

// 添加类操作
if (oprator==="leftin"||oprator==="rightin"){

	// 输入合法性检查
	if (num.value=="") {
		alert("请输入一个数字");
		num.focus();
	}

	else if(isNaN(num.value)){
		alert("请输入数字");
		num.focus();
	}

	else{
		// 左进
		if (oprator==="leftin") {
			var div=document.createElement("div");
			div.innerHTML=num.value;
			container.insertBefore(div,container.firstChild);
		}

		// 右进
		else if (oprator==="rightin") {
			var div=document.createElement("div");
			div.innerHTML=num.value;
			container.appendChild(div);
		}

	}

}

// 删除类操作
if (oprator==="leftout"||oprator==="rightout"||oprator==="del") {
	// 检测队列是否为空
	if (container.getElementsByTagName("div").length==0) {
		alert("队列为空，请输入数字。");
		num.focus();
	}

	// 点击队列元素删除
	else if(oprator==="del"){
		alert("删除数字："+event.target.innerHTML+"!");
		container.removeChild(event.target);
	}

	else{
		// 左出
		if(oprator==="leftout"){
			alert("删除数字："+container.firstChild.innerHTML+"!");
			container.removeChild(container.firstChild);
		}

		// 右出
		if(oprator==="rightout"){
			alert("删除数字："+container.lastChild.innerHTML+"!");
			container.removeChild(container.lastChild);
		}
	
	}

}

}

// 绑定事件
btnleftin.onclick=function(){moveque("leftin");};
btnrightin.onclick=function(){moveque("rightin");};
btnleftout.onclick=function(){moveque("leftout");};
btnrightout.onclick=function(){moveque("rightout");};
container.onclick=function(){moveque("del");};
