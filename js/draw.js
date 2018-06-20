function Draw(settings){//绘制对象，用于在屏幕上绘制地图坦克等
	this.imgs = getMapImgArray(settings);//获取地图图片数组
	
	this.getMapBlock = function(index,settings){//根据地图图片数组和地图图片数据生成地图块数组
		var map = getMap(index);//获取地图数据
		
		var mapBlocks = [];
		for(var i in map){
			for(var j in map[i]){
				mapBlocks[i * map[i].length + j] = new MapBlock(this.imgs[map[i][j]],j * this.imgs[map[i][j]].width,i * this.imgs[map[i][j]].height,this.imgs[map[i][j]].width,this.imgs[map[i][j]].height,map[i][j]);
				//console.log(mapBlocks[qw].id,mapBlocks[qw].x,mapBlocks[qw].y);
			}
		}
		return mapBlocks;
	}
	
	
	this.mapBlocks = this.getMapBlock(0,settings);//根据地图图片数组和地图图片数据生成地图块数组
	//console.log(this.mapBlocks);
	
	this.draw = function(){//在屏幕上绘制所有游戏内容
		this.drawBackground(ctx,settings);
		this.drawMap(4,false);//绘制地图并跳过草地，下标为4
		
		var tempTanks = addArray(tank,tanks);
		this.drawTank(tempTanks);//绘制坦克
		this.drawBullet(tempTanks);//绘制子弹

		
		this.drawMap(4,true);//只绘制草地块
	}
	
	this.drawBackground = function(ctx,settings){//绘制背景
		ctx.fillStyle = settings.mapBackground;
		ctx.fillRect(0,0,settings.canvasWidth,settings.canvasHeight);
	}
	
	this.drawTank = function(tanks){
		for(var i in tanks){
			var tankImg = tanks[i].imgs[tanks[i].direction];
			if(tankImg){//为null时直接跳过绘制，因为图片未处理完成时未null
				ctx.drawImage(tankImg,tanks[i].x,tanks[i].y,tanks[i].width,tanks[i].height);
			}
		}
		
			
	}
	this.drawBullet = function(tanks){
		for(var i in tanks){
			var b = tanks[i].bullets;
			for(var i in b){
				ctx.fillStyle = b[i].color;
				ctx.fillRect(b[i].x,b[i].y,b[i].width,b[i].height);
				
			}
		}
		
		
		
	}
	
	this.drawMap = function(pass,flip){//绘制地图，pass要跳过的地图快,flip翻转，只绘制指定地图块
		for(var i in this.mapBlocks){
			if(this.mapBlocks[i].img.complete){//检查是否存在缓存
				if(flip){//判断是否翻转，翻转则只绘制指定地图块
					if(this.mapBlocks[i].id == pass){//检测是否可跳过地图块
						ctx.drawImage(this.mapBlocks[i].img,this.mapBlocks[i].x ,this.mapBlocks[i].y,this.mapBlocks[i].width,this.mapBlocks[i].height);
					}
				}else{
					if(this.mapBlocks[i].id != pass){//检测是否可跳过地图块
						ctx.drawImage(this.mapBlocks[i].img,this.mapBlocks[i].x ,this.mapBlocks[i].y,this.mapBlocks[i].width,this.mapBlocks[i].height);
					}
				}
			}
		}
			
	}
	
	
	
	function getMapImgArray(settings){//加载所有图像数据
		var imgSrc = settings.imgSrc;
		
		var imgs = [];
		for(var i in imgSrc){
			imgs[i] = new Image();
			imgs[i].src = imgSrc[i];
			imgs[i].width = settings.cellWidth;
			imgs[i].height = settings.cellHeight;
		}
		return imgs;
	}
	function getMap(index){//获取地图
		return settings.map[index];
	}
}


function MapBlock(img,x,y,width,height,id){//地图块类
	this.img = img;
	this.x = x;
	this.y = y;
	this.width = width;
	this.height = height;
	this.id = id;
	this.hp = settings.MapBlockHp[id];//地图块生命值
	this.level = settings.MapBlockLevel[id] ;//地图块等级，低等级子弹无法对高等级地图块造成伤害
}
