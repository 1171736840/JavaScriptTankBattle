function Tank(imgIndex,camp,x,y,hp,direction,id){
	this.x = x || 100;//横坐标
	this.y = y || 350;//纵坐标
	this.width = settings.cellWidth;
	this.height = settings.cellHeight;
	this.sleep = 3;//速度
	this.hp = hp || 1;//生命值默认为1
	this.imgs = {"up":new Image(),"down":null,"left":null,"right":null};//坦克图片
	this.direction = direction || "up";//方向
	this.id = id || 0;
	this.maxBulletNumber = 30;//最大子弹数
	this.bullets = [];//子弹数组
	this.camp = camp || 0;//所属阵营
	this.level = 1;

	
	this.previousX = null;//上次移动时的x
	this.previousY = null;//上次移动时的y
	
	this.autoControl = function(){//自动控制
		
		this.update();
		
		if(0 == parseInt(Math.random()*settings.autoChangeDirectionProbability)){//根据概率改变方向
			this.direction = ["up","down","left","right"][parseInt(Math.random()*4)];
		}
		
		if(this.x == this.previousX && this.y == this.previousY){
			this.direction = ["up","down","left","right"][parseInt(Math.random()*4)];
		}
		this.previousX = this.x;
		this.previousY = this.y;
		
		
		if(0 == parseInt(Math.random()*settings.autoFireStarterProbability)){//根据概率自动开火
			this.fireStarter();
		}
	}
	
	
	this.setImg = function(index){
		var imgSrc = ["img/tank_1.png","img/tank_2.png"];
		this.imgs.up.src = imgSrc[index];
		this.imgs.up.width = settings.cellWidth;
		this.imgs.up.height = settings.cellHeight;
		var th = this;//这里把当前对象this用个变量保存，否则其它函数可能访问不了
		this.imgs.up.onload = function(){//当原图加载完成后设置旋转后的图片
			//分别获取旋转90°,180°,270°的img
			var imgsArray = imgRotate(th.imgs.up);
			th.imgs.right = imgsArray[0];
			th.imgs.down = imgsArray[1];
			th.imgs.left = imgsArray[2];
		}
	}
	
	this.setImg(imgIndex || 0);//设置坦克图片
	
	this.moveTank = function(sleep){//根据方向移动坦克,sleep移动距离
		switch(this.direction){
			case "up":
				this.y -= sleep ;
				break;
			case "down":
				this.y += sleep ;
				break;
			case "left":
				this.x -= sleep ;
				break;
			case "right":
				this.x += sleep ;
				break;
		}
	}
	
	this.update = function(){
		this.moveTank(this.sleep);//根据方向移动坦克,sleep移动距离
		
		//检测是否撞到物体
		var col = collisionDetection([this],draw.mapBlocks,[],[settings.groundMapBlockId]);//碰撞检测，并跳过空地地图块
		var xueDiMove = false;//雪地移动
		for(var key in col){
			for(var i in col[key]){
				if(inArray(col[key][i].id,settings.tankWalkableMapBlock)){//判断是否为坦克可行走地图块
					
					if(col[key][i].id == settings.xueDiMapBlockId && !xueDiMove){//检测是否是雪地
						this.moveTank(settings.xueDiSleep);//是雪地则增加移动速度（再移动一次）
						xueDiMove = true;
					}
					continue;
				}
				//不可行走地图块，根据方向调整坦克位置
				switch(this.direction){
					case "up":
						if(this.y < col[key][i].y + col[key][i].height){
							this.y = col[key][i].y + col[key][i].height;
						}
						break;
					case "down":
						if(this.y > col[key][i].y - this.height){
							this.y = col[key][i].y - this.height;
						}
						break;
					case "left":
						if(this.x < col[key][i].x + col[key][i].width){
							this.x = col[key][i].x + col[key][i].width;
						}
						break;
					case "right":
						if(this.x > col[key][i].x - this.width){
							this.x = col[key][i].x - this.width;
						}
						break;
				}
			}	
		}
		
		//限制坦克到达屏幕外边
		if(this.x < 0) this.x = 0;
		if(this.y < 0) this.y = 0;
		if(this.x > settings.canvasWidth - this.width) this.x = settings.canvasWidth - this.width;
		if(this.y > settings.canvasHeight - this.height) this.y = settings.canvasHeight - this.height;
	

		
		
	}
	
	this.fireStarter = function(){//开火
		if(this.bullets.length < this.maxBulletNumber){
			var bulletPosition = {
				"up":{
					"x":this.x + (this.width - settings.bulletWidth)/2,
					"y":this.y - settings.bulletHeight,
					"width":settings.bulletWidth,
					"height":settings.bulletHeight,
					"sleepX":0,
					"sleepY":-settings.bulletSleep
				},
				"down":{
					"x":this.x + (this.width - settings.bulletWidth)/2,
					"y":this.y + this.height,
					"width":settings.bulletWidth,
					"height":settings.bulletHeight,
					"sleepX":0,
					"sleepY":settings.bulletSleep
				},
				"left":{
					"x":this.x - settings.bulletHeight,
					"y":this.y + (this.height - settings.bulletWidth)/2,
					"width":settings.bulletHeight,
					"height":settings.bulletWidth,
					"sleepX":0-settings.bulletSleep,
					"sleepY":0
				},
				"right":{
					"x":this.x + this.width,
					"y":this.y + (this.height - settings.bulletWidth)/2,
					"width":settings.bulletHeight,
					"height":settings.bulletWidth,
					"sleepX":settings.bulletSleep,
					"sleepY":0
				}
			};
			
			var bp = bulletPosition[this.direction];//根据方向获取子弹出现位置
			this.bullets.push(new Bullet(bp.x,bp.y,bp.width,bp.height,bp.sleepX,bp.sleepY,settings.bulletColor,settings.bulletDamage,this.camp));
			

		}
	}

}
