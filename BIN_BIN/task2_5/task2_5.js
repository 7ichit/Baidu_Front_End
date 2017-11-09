// 获取输入的数值
var num=document.getElementById('num');
// 初始化排序状态存储队列
var state=new Array();
for (var z = 0; z < 100; z++) {
	state[z]=new Array();
}
// 状态队列原始数据采集计数
var n=0;
// 队列容器
var container=document.getElementById('container');
// 获取按钮
var btnleftin=document.getElementById('leftin');
var btnleftout=document.getElementById('leftout');
var btnrightin=document.getElementById('rightin');
var btnrightout=document.getElementById('rightout');
var btnreorder=document.getElementById('reorder');

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
		num.value="";
		num.focus();
	}
	// 限制输入的数字在10-100
	else if (num.value<10||num.value>100) {
		alert("请输入10-100之间的数字");
		num.value="";
		num.focus();
	}
	// 队列元素数量最多限制为60个，当超过60个时，添加元素时alert出提示
	else if (container.getElementsByTagName('li').length>=60) {
		num.value="";
		alert("队列元素已满60，请勿输入。");
	}

	else{
		// 左进
		if (oprator==="leftin") {
			var li=document.createElement("li");
			li.value=num.value;
			container.insertBefore(li,container.firstChild);
			var height=parseInt(window.getComputedStyle(li,null)['height']);
			li.style.height=num.value/100*height+"px";
			num.value="";
			num.focus();
		}

		// 右进
		else if (oprator==="rightin") {
			var li=document.createElement("li");
			li.value=num.value;
			container.appendChild(li);
			var height=parseInt(window.getComputedStyle(li,null)['height']);
			li.style.height=num.value/100*height+"px";
			num.value="";
			num.focus();
		}

	}

}

// 删除类操作
else if (oprator==="leftout"||oprator==="rightout") {
	// 检测队列是否为空
	if (container.getElementsByTagName("li").length==0) {
		alert("队列为空，请输入数字。");
		num.focus();
	}

	else{
		// 左出
		if(oprator==="leftout"){
			alert("删除数字："+container.firstChild.value+"!");
			container.removeChild(container.firstChild);
		}

		// 右出
		if(oprator==="rightout"){
			alert("删除数字："+container.lastChild.value+"!");
			container.removeChild(container.lastChild);
		}
	
	}

}

else{
	// 点击队列元素删除
	alert("删除数字："+container.removeChild(event.target).value+"!");
}

}

// 用于交换两个节点的位置
function exchangeNode(anode,bnode) {
		
	// 将节点a置于节点b的前面
	function insert(a,b) {
		b.parentNode.insertBefore(a,b);
	}

  	var oli=document.createElement("li"); 
  	insert(oli,bnode);
  	insert(bnode,anode);
  	insert(anode,oli);
  	anode.parentNode.removeChild(oli);
}

// 存储排序每步交换的状态
function restore(lis,n) {
	for (var i = 0; i < lis.length; i++) {
		state[n][i]=lis[i].value;
	}
}
// 将排序中的每个状态展现出来
function render() {
	// 计时器
	var timer;
	// 每个步骤的数组转化为图形并呈现出来
	function showprocess(){
		if(n){
			container.innerHTML="";
			var item=state.shift();
			for (var i = 0; i < item.length; i++) {
				var li=document.createElement("li");
				li.value=item[i];
				container.appendChild(li);
				var height=parseInt(window.getComputedStyle(li,null)['height']);
				li.style.height=item[i]/100*height+"px";
			}
			n--;
		}
		else{
			clearInterval(timer);
		}
	}
	// 先立即执行一次处理程序
	showprocess();

	// 设置计时 每500ms调用一次showprocess
	timer=setInterval(showprocess,500)
}

// 排序（冒泡法）
function reorder() {

	// 冒泡排序
	var lis=container.getElementsByTagName('li');
	for (var i = 0; i< lis.length; i++) {
		for (var j = 0; j < lis.length-1-i; j++) {
			// 记录数组状态
			if (lis[j].value>lis[j+1].value) {
				exchangeNode(lis[j],lis[j+1]);
			}
	// 记录数组存储排序时数组的每一步状态
			restore(lis,n);
			n++;
		}
	}
		// 输出每步的排列
			render();
}

// 绑定事件
btnleftin.onclick=function(){moveque("leftin");};
btnrightin.onclick=function(){moveque("rightin");};
btnleftout.onclick=function(){moveque("leftout");};
btnrightout.onclick=function(){moveque("rightout");};
container.onclick=function(){moveque(event.target);};
btnreorder.onclick=function(){reorder();};
