function Settings(){
	this.canvasWidth = 650;
	this.canvasHeight = 650;
	this.cellWidth = 50;//单个格子（地图块）宽度
	this.cellHeight = 50;//单个格子（地图块）高度
	this.mapBackground = "#000000";//地图背景颜色
	this.tankWalkableMapBlock = [4,5];//坦克可行走地图块
	this.groundMapBlockId = 0;//地面地图块id
	this.hongQiangMapBlockId = 1;//雪地地图块id
	this.tieQiangMapBlockId = 2;//地面地图块id
	this.shuiMapBlockId = 3;//地面地图块id
	this.caoDiMapBlockId = 4;//地面地图块id
	this.xueDiMapBlockId = 5;//雪地地图块id
	this.xueDiSleep = 2;//雪地移动速度
	
	this.MapBlockHp = [0,1,3,0,0,0];//地图块id对于的生命值
	this.MapBlockLevel = [99,1,2,99,99,99];
	
	this.bulletWidth = 4;//子弹宽度
	this.bulletHeight = 10;//子弹高度
	this.bulletSleep = 5;//子弹速度
	this.bulletDamage = 1;//子弹伤害值
	this.bulletColor = "#FFFFFF";//子弹颜色
	
	this.autoFireStarterProbability = 70;//自动开火可能性，数值越大可能性越小
	this.autoChangeDirectionProbability = 35;//自动改变方向可能性，数值越大可能性越小
	
	
	this.imgSrc = [//地图数据对应的图片
			"img/ground.png",
			"img/hongQiang.png",
			"img/tieQiang.png",
			"img/shui.png",
			"img/caoDi.png",
			"img/xueDi.png"
		];
	this.map = [//所有地图数据
		[//第一关
			[0,0,0,0,0,0,0,0,0,0,0,0,0],
			[1,0,4,1,1,1,1,1,1,1,1,1,2],
			[0,0,2,0,0,0,0,0,3,3,3,4,4],
			[0,0,0,0,3,3,0,0,3,3,3,4,4],
			[5,5,2,1,3,3,0,0,4,4,4,4,4],
			[5,5,2,4,4,4,0,0,5,5,5,5,5],
			[5,5,0,4,4,4,0,0,1,1,1,1,1],
			[5,5,0,4,4,4,0,0,0,0,0,0,0],
			[5,5,0,3,3,3,3,3,3,3,0,0,4],
			[0,0,0,0,0,0,0,0,0,0,0,0,4],
			[2,2,0,0,0,2,2,2,0,0,0,2,2],
			[4,4,0,0,0,3,3,3,0,0,0,4,4],
			[0,0,0,0,0,1,1,1,0,0,0,0,0]
		],
		[//第二关
			
		]
	];
}
