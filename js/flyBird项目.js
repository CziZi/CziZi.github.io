//获取对象wrapgame
var wrapGame = document.getElementById("wrapGame");
//头部dv
var hearDiv = document.getElementById("head");
//开始菜单
var startMenuBtn = document.getElementById("startMenu");
//结束菜单
var endMenu = document.getElementById("endMenu");
//当前得分
var currentScore = document.getElementById("currentScore");
//最高得分
var bestScore = document.getElementById("bestScore");
//获取所有管道的父级ul
var pipesul = document.getElementById("pipes");
//飞翔的小鸟
var birdImg = document.getElementById("bird");
//记录分数的图片
var score = document.getElementById("score");
//草坪对象
var grass = document.getElementById("grass");
//游戏背景音乐
var gameMusic  =document.getElementById("gameMusic");
//小鸟飞翔的音乐
var bulletMusic = document.getElementById("bulletMusic");
//游戏结束音乐
var gameOverMusic = document.getElementById("gameovermusic");
//小鸟下落的定时器
var birdDownTimer;
//小鸟上升的定时器
var birdFlyTimer;
//创建管道的定时器
var createPipeTimer;

//为点击开始按钮添加点击事件
startMenuBtn.onclick = function(e){
	//事件对象
	var event1 = window.event ||e;
	//1.取消事件冒泡(只执行开始按钮的点击事件,不执行小鸟的点击飞翔事件)
	event1.cancelBubble = true;
	event1.stopPropagation();
	//2.播放背景音乐
	gameMusic.play();
	gameMusic.loop = true;//循环播放
	//3.隐藏开始菜单
	startMenuBtn.style.display = "none";
	hearDiv.style.display="none";
	//4.显示小鸟以及所得分数的图片部分
	birdImg.style.display="block"
	score.style.display = "block"
    //5.草坪的移动	
     //grassMove()
     //或者
     setInterval(grassMove2,30)
     //6.小鸟的下落
     birdDownTimer = setInterval(birdDown,30);
     //7.小鸟的上升
//   wrapGame.onclick = function(){
//   	clickBirdFly();
//   }
     //或者
     wrapGame.onclick = clickBirdFly;
     //8.创建管道
   createPipeTimer=setInterval(creatPipes,2000)
   //9.处理碰撞检测,每隔30毫秒检测一次
   setInterval(dealCrash,30)
}
//处理碰撞检测的函数
function dealCrash(){
	//获取所有的li管道(上下管道)
	var lis = pipesul.getElementsByTagName("li");
	//判断所有的上下管道和袅袅是否发生碰撞
	for (var i=0;i<lis.length;i++) {
		//当管道右边距小于小鸟的左边距时,不需要在做碰撞检测,反之,需要判断当管道的右边距大于小鸟的左边距时,需要做装检测
		if (lis[i].offsetLeft+lis[i].offsetWidth>birdImg.offsetLeft) {
					//判断上管道是否与小鸟碰撞
//		lis[i].firstElementChild   上管道
   if (isCrash(birdImg,lis[i].firstElementChild)) {
	//碰撞了
	gameOver();
        }
      //判断下管道是否与小鸟碰撞
//		lis[i].lastElementChild   上管道
      if (isCrash(birdImg,lis[i].lastElementChild)) {
      	//碰撞了
	gameOver();
      }
	}
	}
}
//封装两个对象是否碰撞
function isCrash(obj1,obj2){
	//设置一个bool值,假设true碰撞上了
	var boolCrash  =true;
//	获取obj1的上下左右边距------鸟对象
  var left1 =obj1.offsetLeft;
  var right1 = obj1.offsetLeft+obj1.offsetWidth;
  var top1 = obj1.offsetTop
  var bottom1 = obj1.offsetTop+obj1.offsetHeight;
  //获取obj2的上下左右边距-----管道对象
//obj2.offsetParent   管道对象的定位父级元素li
  var left2= obj2.offsetParent.offsetLeft;
  var right2 = obj2.offsetParent.offsetLeft+obj2.offsetWidth;
  var top2 = obj2.offsetTop;
  var bottom2 = obj2.offsetTop+obj2.offsetHeight;
//判断碰撞条件
//不碰撞的条件 right < left2 || left1>right2 || bottom1<top2|| top1>bottom2
      if (!(right1 < left2 || left1>right2 || bottom1<top2|| top1>bottom2)) {
      	//碰上了,
      	boolCrash = true;
      }else{
      	//没碰上
      	boolCrash = false;
      }
     return boolCrash;
}

//处理草坪移动的函数
     var index = 0;
     function grassMove(){
     	setInterval(function(){
     		index+=2;
     		if (index>=wrapGame.offsetWidth) {
     			index=0;
     		}
     		grass.style.left=-index+"px";
     	},30)
     }
  function grassMove2(){
  	index+=2;
     		if (index>=wrapGame.offsetWidth) {
     			index=0;
     		}
     		grass.style.left=-index+"px";
  }
//小鸟下落的处理
var speed = 0;
function birdDown(){
	//修改状态---下落
	birdImg.src="img/down_bird.png"
//	setInterval(function(){
//		birdImg.src="img/down_bird.png"
//		birdImg.src="img/down_bird0.png"
//		birdImg.src="img/down_bird1.png"
//	},3000)
	//改变速度
	speed+=0.5;
	//设置最大速度
	if (speed>=5) {
		speed=5;
	}
	//修改小鸟的位置
	birdImg.style.top= birdImg.offsetTop+speed +"px";
	//判断是否碰到草坪
	if(birdImg.offsetTop+birdImg.offsetHeight>=pipesul.offsetHeight) {
		//碰到草坪了 game over
		//调用游戏结束的函数
		gameOver();
	}
}
//游戏结束的函数
function gameOver(){
	//清除小鸟下落的定时器
//	clearInterval(birdDownTimer)
	//上升的定时器
//	clearInterval(birdFlyTimer)
	//结束背景音乐
	gameMusic.pause();
	//启动死亡音乐
	gameOverMusic.play();
	wrapGame.onclick = null;//取消点击飞翔的事件
	//显示游戏gameover菜单
	endMenu.style.display ="block"
	//设置结束菜单层级
	endMenu.style.zIndex = 2;
	game1.style.zIndex = 3;
	//停止页面所有的定时器
	//当前网页加载完成后,创建的定时器的ID是递增的,只要能获取到最后一个定时器的id就能遍历得到所有的定时器,然后通过id清除对应的定时器
	//获取页面此时所有的定时器,也就是最后一个定时器的id
	var allTimer = setInterval(function(){},1)
	for (var i=1;i<=allTimer;i++) {
			//清除每个id的定时器
			clearInterval(i)
		}
	//显示当前成绩
	currentScore.innerHTML = scorenum;
	//显示最高成绩,必须使用本地存储
	  //bestScores
	  if (localStorage.bestScores) {
	  	//获取本地存储的最高得分与当前得分比较,获取最高值
	  	localStorage.bestScores = localStorage.bestScores> scorenum? localStorage.bestScores: scorenum
	  	bestScore.innerHTML = localStorage.bestScores;
	  } else{
	  	bestScore.innerHTML = scorenum
	  	//第一次玩游戏,最高得分就是当前得分
	  	localStorage.bestScores = scorenum
	  }
	  game1.style.display ="block";
	  alert("嘿嘿,小垃圾😉")
}
//小鸟上升的函数
function clickBirdFly(){
	//播放小鸟上升的音乐
	bulletMusic.play();
	//清除小鸟下落的定时器
	clearInterval(birdDownTimer);
	//修改速度值,开始上升时速度最快
	speed =5;
	//清除上次上升的定时器
   	clearInterval(birdFlyTimer);
	//创建小鸟上升的定时器
	birdFlyTimer= setInterval(function(){
		//改变小鸟的状态
//		setInterval(function(){
//		birdImg.src="img/up_bird.png"
//		birdImg.src="img/up_bird0.png"
//		birdImg.src="img/up_bird1.png"
//	},3000)
		birdImg.src = "img/up_bird.png"
		speed-=0.5;
//		当速度speed小于或者等于0时,小鸟就会下落,也就是重新启动小鸟下落的定时器
   if (speed<=0) {
   	//清除上升的定时器
   	clearInterval(birdFlyTimer);
   	//从新创建小鸟下降的定时器
   	 birdDownTimer = setInterval(birdDown,30);
   }
   //修改小鸟的位置
   birdImg.style.top = birdImg.offsetTop-speed+"px";
// 判断是否碰撞到顶部
    if (birdImg.offsetTop<=0) {
    	gameOver();
    }
	},30);	
}
function ranNum(m,n){
	var ran = Math.floor(Math.random()*(n-m+1)+m)
	return ran;
}
//创建管道的函数
function creatPipes(){
	//创建一个上下管道所在的li对象
	var li = document.createElement("li")
	//添加li的样式
	li.className = "pipe";
	li.style.left = wrapGame.offsetWidth+"px";//每次创建都在屏幕右侧以外
	//添加li节点
	pipesul.appendChild(li);
	//随机上管道的高度
	var top_height = ranNum(70,200);
	//获取下管道的高度,通道口高度为150
	var bottom_height = li.offsetHeight-120-top_height;
	//创建上管道
	var topDiv  = document.createElement("div");
	topDiv.className = "up_pipe";
	topDiv.style.height = top_height+"px";
	//添加上管道到li中
	li.appendChild(topDiv);
	//创建下管道
	var bottomDiv = document.createElement("div");
	bottomDiv.className = "down_pipe";
	bottomDiv.style.height=bottom_height+"px";
	//添加下管道到li中
	li.appendChild(bottomDiv);
	//获取此时li的left的值
	var distance = wrapGame.clientWidth;//移动距离
	//让管道移动---设置管道移动的定时器
	 var  pipeMoveTimer = setInterval(function(){
		distance-=2;//每隔30毫秒,向左移动2像素,和草坪保持一致
		li.style.left = distance+"px";
		//当创建的li管道移出屏幕时,则删除该li节点
		if (distance<=-li.offsetWidth) {
			//删除li管道
			pipesul.removeChild(li);
			//取消该管道滚动的定时器
			clearInterval(pipeMoveTimer);
		}
		//处理得分(distance-----2时)说明小鸟已经通过管道,也急速此时<-2 找个临界值-3
		if (distance==-3) {
			//处理显示的得分
			changeAllScore();
		}
	},30)	
}
var scorenum =0;//记录得分
function changeAllScore(){
	scorenum++;
	//清空score里面的内容---img得分的图片
	score.innerHTML = "";
	//添加分数图片
	if (scorenum<10) {
		//显示一张图片,一位数的图片
		var img = document.createElement("img");
		img.src="img/"+scorenum+".jpg";
		//添加节点到score中
		score.appendChild(img)
	} else{
		//当得分是两位数时
		var img1 =document.createElement("img");
		img1.src ="img/"+Math.floor(scorenum/10)+".jpg"
		score.appendChild(img1);
		//个位数图片
		var img2 =document.createElement("img");
		img2.src ="img/"+scorenum%10+".jpg"
		score.appendChild(img2);
	}
}
game1.onclick = function(){
	window.location.reload(); 
}











