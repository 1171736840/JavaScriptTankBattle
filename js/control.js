function Control(){//控制类，检测键盘按键
	this.direction = null;//方向
	
	this.update = function(){
		//更新坦克
		this.updateTank();
		//更新子弹
		tank.bullets = this.updateBullet(tank.bullets);
		
		for(var i in tanks){
			//tanks[i].autoControl();//坦克编组自动控制
			
			tanks[i].bullets = this.updateBullet(tanks[i].bullets);
		}
		if(tank.hp<=0){
			//alert("游戏结束");
		}
		//把生命值耗尽的坦克删除
		tanks = this.delTankByHpIsZero(tanks)
	}
	this.delTankByHpIsZero = function(tanks){//删除生命值小于等于0的坦克
		var tTanks = [];
		for(var i in tanks){
			if(tanks[i].hp > 0){
				tTanks.push(tanks[i]);
			}
		}
		return tTanks;
		
	}
	this.updateTank = function(){//更新坦克
		if(this.direction != null){//判断方向控制是否为空
			tank.direction = this.direction;
			tank.update();	
				
		}
		//tank.autoControl();//自动控制
		
		for(var i in tanks){
			tanks[i].autoControl();//坦克编组自动控制
		}
	}
	this.updateBullet = function(bullets){//更新子弹
		var bu = [];
		for(var i in bullets){
			if(bullets[i].update()){//更新子弹坐标，在屏幕之外或消失的子弹的返回false
				bu.push(bullets[i]);
			}
		}
		return bu;
	}

}


