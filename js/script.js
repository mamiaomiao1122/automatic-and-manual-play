//script.js功能
//1.实现自动轮播图片   2.原点切换图片  3.左右点击click切换图片

//重点：所有的都是为了获取索引index（全局变量的特点），来找到dom元素，从而获取想要的东西
//一进来，执行函数slideImg();

//封装获取id的方法
function byid(id){	
	return typeof(id) === "string"?document.getElementById(id):id;
}

var index = 0;
var timer = null;
var pics = byid("banner").getElementsByTagName("div"),   //是一个数组
    dots = byid("dots").getElementsByTagName("span"),
    prev = byid("prev"),
    next = byid("next"),
    len = pics.length;

function slideImg(){
	var main = byid("main");
	main.onmouseover = function(){
		if(timer) clearInterval(timer);
	}
	main.onmouseout = function(){
		timer = setInterval(function(){
			index++;
			if(index>=len){
				index = 0;
			}
			changeImg();
		},2000);
	}
	main.onmouseout();
	//点击原点之后的事件
	for(var d= 0;d<len;d++){
		dots[d].id = d;    //为了获得当前的索引id
		dots[d].onclick = function(){  //！！！注意在这个函数里，d的值始终是3，不会遍历，不是循环里的每个之
			index = this.id;
			
			//调用切换图片的函数
			changeImg();
			
		}
	}
	//右键箭头next
	next.onclick = function(){
		index++;
		console.log(index);
		if(index>=len)
		      index=0;
		changeImg();
	}
	//左键箭头prev
	prev.onclick = function(){
		index--;
		console.log(index);
		if(index<0) 
			index=len-1;
		changeImg();
	}

}
//切换图片
function changeImg(){       //index是全局变量就不用传参
	 //遍历所有的div
	 for(var i=0;i<len;i++){
	 	pics[i].style.display = "none";
	 	dots[i].className = "";
	 		 }
	 //当前的div 
	 pics[index].style.display = 'block';
	 dots[index].className = "active";
}
slideImg();