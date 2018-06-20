function Bullet(x,y,width,height,sleepX,sleepY,color,damage,camp){//子弹类
	this.x = x;//横坐标
	this.y = y;//纵坐标
	this.width = width;//宽度
	this.height = height;//高度
	this.color = color;//颜色
	this.sleepX = sleepX;//每次横向移动距离
	this.sleepY = sleepY;//每次纵向移动距离
	this.damage = damage;//伤害值
	this.camp = camp;//所属阵营

	this.level = 1;//子弹等级
	
	this.update = function(){//更新子弹坐标，在屏幕之外的返回false
		var dis = true;//子弹是否继续保留（没有撞到东西）
		
		this.x += this.sleepX;
		this.y += this.sleepY;
		if(this.x + this.width < 0 || this.y + this.height <0 || this.x > settings.canvasWidth || this.y > settings.canvasHeight){
			dis =  false;
		}
		
		//与地图块碰撞检测，并跳过空地地图块
		var col = collisionDetection([this],draw.mapBlocks,[],[settings.groundMapBlockId,3,4,5]);
		for(var key in col){
			for(var i in col[key]){
				//console.log(col[key][i]);
				dis =  false
				//判断子弹等级是否大于地图块等级，低等级子弹无法对高等级地图块造成伤害
				if(this.level >= col[key][i].level){
					col[key][i].hp -= this.damage;//根据伤害值减少生命值
					if(col[key][i].hp <= 0){//如果生命值小于等于0
						col[key][i].id = settings.groundMapBlockId;
						col[key][i].img = draw.imgs[col[key][i].id];
						
	
					}
				}
				
			}
		}
		//与敌方坦克块碰撞检测，并跳过空地地图块
		var tempTanks = addArray(tank,tanks);
		col = collisionDetection([this],tempTanks,[],[]);
		for(var key in col){
			for(var i in col[key]){
				//console.log(col[key][i]);
				
				//判断子弹等级是否大于地图块等级，低等级子弹无法对高等级地图块造成伤害
				//子弹等级大于等于坦克等级且子弹和坦克不属于同一阵营则造成伤害
				if(this.level >= col[key][i].level && this.camp != col[key][i].camp){
					col[key][i].hp -= this.damage;//根据伤害值减少生命值
					dis =  false
				}
				
			}
		}
		
		return dis;
	}
}
