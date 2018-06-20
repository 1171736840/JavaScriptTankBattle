window.onload = function(){
	//初始化操作
	window.canvas = document.getElementById("canvas");
	window.ctx = canvas.getContext("2d");
	
	window.settings = new Settings();//设置类
	window.draw = new Draw(settings);//屏幕图像绘制类
	
	canvas.width = settings.canvasWidth;
	canvas.height = settings.canvasHeight;
	
	window.tank = new Tank(0,1,null,null,500);//我方坦克
	window.control = new Control();//玩家控制类
	
	window.tanks = [];//敌人
	
	window.myTankHp = document.getElementById("myTankHp");
	window.enemyTankNumber = document.getElementById("enemyTankNumber");
	
	for(var i = 0;i < 10;i++){//初始化敌方坦克
		tanks.push(new Tank(1,0,parseInt(Math.random() * settings.canvasWidth),parseInt(Math.random() * settings.canvasHeight)))
	}
	alert("准备好了吗？点击确定开始游戏");
	document.getElementById("audio").play();
	playGame();
}
function playGame(){
	
	control.update();//根据玩家控制更新游戏
	
	draw.draw(); //绘制游戏屏幕
	gameCount();//游戏计数

	
	if(tank.hp > 0 && tanks.length != 0){//玩家生命值没有耗尽,或敌方坦克全部被消灭
		setTimeout("playGame()",30);
	}
	
	if(tank.hp <= 0){
		alert("游戏失败！我方坦克生命值耗尽");
	}
	if(tanks.length == 0){
		alert("游戏胜利敌方坦克全部被消灭！");
	}
	
}

function gameCount(){//游戏计数
	myTankHp.innerHTML = "我方坦克生命值：" + tank.hp;
	enemyTankNumber.innerHTML = "敌方剩余坦克数：" + tanks.length;
	
}
function playMusic(src){
	
}


function collisionDetection(obj_0,obj_1,passIdArray_0,passIdArray_1){//碰撞检测
	var rect_0,rect_1;
	var collisionObj = {};
	for(i in obj_0){
		if(inArray(obj_0[i].id,passIdArray_0)){//检测是否要跳过
			continue;
		}
		for(j in obj_1){
			if(inArray(obj_1[j].id,passIdArray_1)){//检测是否要跳过
				continue;
			}
			r_0 = {
				"left":obj_0[i].x,
				"top":obj_0[i].y,
				"right":obj_0[i].x + obj_0[i].width,
				"bottom":obj_0[i].y + obj_0[i].height
			};
			r_1 = {
				"left":obj_1[j].x,
				"top":obj_1[j].y,
				"right":obj_1[j].x + obj_1[j].width,
				"bottom":obj_1[j].y + obj_1[j].height
			};
			if(isCollision(r_0,r_1)){//如果发生碰撞
				
				if(collisionObj[obj_0[i]]){
					collisionObj[obj_0[i]].push(obj_1[j]);
				}else{
					collisionObj[obj_0[i]] = [];
					collisionObj[obj_0[i]].push(obj_1[j]);
				}
				//console.log("碰撞");
			}
		}
		
	}
	
	return collisionObj;
	
	function isCollision(r_0,r_1){//判断是否碰撞
		if(r_0.left >= r_1.left && r_0.left >= r_1.right){
			return false;
		}else if(r_0.left <= r_1.left && r_0.right <= r_1.left){
			return false;
		}else if(r_0.top  >= r_1.top  && r_0.top  >= r_1.bottom){
			return false;
		}else if(r_0.top  <= r_1.top && r_0.bottom <= r_1.top){
			return false;
		}
		return true;
		
		
	}
	
	
	
}

function inArray(obj,array){
	for(var i in array){
		if(obj == array[i]){
			return true;
		}
	}
	return false;
}

function addArray(obj,array){
	var a = [];
	for(var i in array){
		a[i] = array[i];
	}
	a[a.length] = obj;
	return a;
	
}

function imgRotate(img){//分别获取旋转90°,180°,270°的img
	var canvas = document.createElement("canvas");
	var ctx = canvas.getContext("2d");
	var imgs = [new Image(),new Image(),new Image()];
	canvas.height = img.height;
	
	//定义3个角度的参数
	var items = [
		{"angle":90,"x":0,"y":-img.height},
		{"angle":180,"x":-img.width,"y":-img.height},
		{"angle":270,"x":-img.width,"y":0}
	];
	
	for(var i in items){
		canvas.width = img.width;//更改大小后会清空canvas中的内容
		ctx.rotate(items[i].angle*Math.PI/180);//旋转指定角度
		ctx.drawImage(img,items[i].x,items[i].y);//绘制图形
		imgs[i].src = canvas.toDataURL("image/png");//获取图形src
	}
	return imgs;
}



window.onkeydown = function(event){//挂载按下某键事件
	//37左，38上，39右，40下
	if(event.keyCode >= 37 && event.keyCode <= 40){
		var keyValues = ["left","up","right","down"];
		
		if(control.direction != keyValues[event.keyCode - 37]){//判断按键与原本的是否不相等
			control.direction = keyValues[event.keyCode - 37];
			//console.log(control.direction);
		}	
	}
	//空格键32
	if(event.keyCode == 32){
		tank.fireStarter();
	}
}
window.onkeyup = function(event){//挂载放开某键事件
	//37左，38上，39右，40下
	if(event.keyCode >= 37 && event.keyCode <= 40){
		var keyValues = ["left","up","right","down"];
		
		if(control.direction == keyValues[event.keyCode - 37]){//判断按键与原本的是否相等
			control.direction = null;
			//console.log(control.direction);
		}
	}
}
