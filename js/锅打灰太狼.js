//随机函数
function ranNum(m, n) {
	var ran = Math.floor(Math.random() * (n - m + 1) + m);
	return ran;
}
//封装一个函数,用来处理是得分还是失分
function scoringFn(obj){
	//parseInt() 解析一个字符串,并返回一个数值
	//获取分数
	  var scores =  parseInt(scoring.innerHTML);
	  //判断是灰太狼还是小灰灰
	  if (obj.type == "x") {
	  	//减十分,打了小灰灰
	  	scoring.innerHTML = scores-10;
	  } else{
	  	//加10分,打了灰太狼
	  	scoring.innerHTML = scores+10;
	  }
}
//当文档加载完成时,触发
window.onload = function() {
	//分数对象
	var scoring = document.getElementById("scoring");
	//倒计时对象
	var countDown = document.getElementById("countDown");
	//获取所有灰太狼或者小灰灰父级div
	var wolfs = document.getElementById("wolfs");
	//开始菜单
	var menu = document.getElementById("menu");
	//开始按钮
	var start = document.getElementById("start");
	//游戏结束
	var gameover = document.getElementById("gameover");
	//灰太狼随机出现的位置,使用数组来存储对应关系的数组----出现的位置对象   随机出现的有以下9个对象
	var arrPosi = [{
		l: "98px",
		t: "115px"
	}, {
		l: "17px",
		t: "160px"
	}, {
		l: "15px",
		t: "220px"
	}, {
		l: "30px",
		t: "293px"
	}, {
		l: "122px",
		t: "273px"
	}, {
		l: "207px",
		t: "295px"
	}, {
		l: "200px",
		t: "211px"
	}, {
		l: "187px",
		t: "141px"
	}, {
		l: "100px",
		t: "185px"
	}];
	//获取倒计时图片的宽度
	var countDownWidth = countDown.offsetWidth;
	var countDownBol = false;
	//创建设置倒计时定时器
	var countDownTimer = setInterval(function(){
		if (countDownBol) {
			countDownWidth-=2;
			//如果剩余时间小于0;(图片宽度为0)
			if (countDownWidth<0) {
				//结束游戏
				gameover.style.display="block"
				//清除倒计时定时器
				clearInterval(countDownTimer);
				//同时清除随机灰太狼的定时器
				clearInterval(createWolfTimer);
			}
			//每执行一次定时器,图片宽度减-2,同时重新设置图片宽度
			countDown.style.width = countDownWidth + "px"
		}	
	},100);
	var createWolfTimer;//用来存储随机灰太狼出现的定时器;
	var presIndex = -5;//记录随机灰太狼的上次位置下标
	//开始按钮的点击事件
	start.onclick = function(){
		//当开始游戏时,需要将倒计时定时器的状态设置为true,便于开始倒计时
		countDownBol = true;
		//开始菜单隐藏
		menu.style.display = "none";
		//创建灰太狼或者小灰灰,每隔1秒创建一只
		createWolfTimer = setInterval(function(){
			//创建用来显示灰太狼节点的img
			var wolf = document.createElement("img");
			//随机是灰太狼还是小灰灰,随机类型即可,路径后缀"h"灰太狼'x'小灰灰
			wolf.type = ranNum(1,100)>80? "x":"h";
			//设置属性值表明灰太狼出现时此时的状态,第一种=张
			wolf.index = 0;//初始值0,第一张
			//设置节点路径,src
			wolf.src ="img/"+wolf.type +wolf.index+".png";
			//获取所有的灰太狼或者小灰灰
			var nowWolfs = wolfs.children;
			//避免此次随机灰太狼的位置和上一次重复
			var resultBol = true;//代表是否继续随机
			var r = ranNum(0,arrPosi.length-1);//随机位置下标
			//第一种方式
//			while(resultBol){
//			r = 	ranNum(0,arrPosi.length-1)
//			if (presIndex==r) {
//				//说明和上次重复
//				resultBol = true;
//			} else{
//				//不重复
//				resultBol = false;
//			}
//			}
             //第二种方式
             while(resultBol){
             	if (presIndex==r) {
             		//说明和上次位置重复,继续随机
             		r=ranNum(0,arrPosi.length-1)
             	} else{
             		break;//不重复跳出循环 
             	}
             }
             //将r下标对应的位置设置给创建的img节点;
             wolf.style.left= arrPosi[r].l;
             wolf.style.top = arrPosi[r].t;
             //将wolf插入到wilfsdiv中
             wolfs.appendChild(wolf);
             //记录上次下标位置
			presIndex = r;
			//创建灰太狼上升的定时器
			wolf.upTimer = setInterval(function(){
				wolf.index++;//为了切换图片
				if (wolf.index>4) {
					//清除狼上升定时器
					clearInterval(wolf.upTimer);
					//启动狼下降的定时器
					wolf.downFn();
				}
				wolf.src ="img/"+wolf.type+wolf.index +".png";
			},100);			
			//狼下降(躲藏)的函数
			wolf.downFn = function (){
				//创建一个灰太狼躲藏的定时器
			wolf.downTimer = setInterval(function(){
					wolf.index--;
					if (wolf.index==0) {
						//清除灰太狼躲藏的定时器
						clearInterval(wolf.downTimer)
						//移出灰太狼所在的节点
						wolfs.removeChild(wolf);
					}
					wolf.src ="img/"+wolf.type+wolf.index +".png";
				},100)
			}
			//记录狼点击的状态 假设true是未点击,只能点击一次该节点img
			wolf.clickBol = true;
			//给灰太狼或者小灰灰添加点击事件
			wolf.onclick=function(){
				if (wolf.clickBol==false) {
					return;
				}
				wolf.clickBol=false;//每次点击之后,修改状态,记录为已点击
				//处灰太或者小灰灰,是得分还是失分
				scoringFn(wolf);
				//清除灰太狼上升的定时器和下降的定时器
				clearInterval(wolf.upTimer);
				clearInterval(wolf.downTimer);
				//重置index为5,目的是切换到击打狼的图片
				wolf.index = 5;
				//处理点击灰太狼之后创建一个定时器,击打狼的动画
				wolf.clickTimer = setInterval(function(){
					wolf.index++;
					if (wolf.index == 9) {
						//清除击打灰太狼的定时器
						clearInterval(wolf.clickTimer);
						//移除灰太狼所在的节点
						wolfs.removeChild(wolf);
					}
			wolf.src ="img/"+wolf.type+wolf.index +".png";
				},100)
			}
			
		},500);
	}			
	
	
	
	
	
	
	
	
}





