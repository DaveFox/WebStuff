function main()
{
	//local scope variables
	var canvas = null,
		ctx = null,
		CANVAS_WIDTH = 0,
		CANVAS_HEIGHT = 0,
		NUM_RECTS = 40,
		FPS = 60,
		entities = [];
		
	function box (width, height, xpos, ypos)
	{ 
		this.width = width;
		this.height = height;
		this.x = xpos;
		this.y = ypos;
		this.dirX = 1;
		this.dirY = 1;
		
		this.draw = function draw()
		{
			ctx.fillStyle = "#600";
			ctx.fillRect(this.x,this.y,this.width,this.height);
		}
	}

	var update = function update()
	{
		ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
	};

	var draw = function draw()
	{
		entities.forEach(function (ent)
		{
			ent.draw();
		});
	};

	var move = function move()
	{
		//canvas bounds checking
		entities.forEach(function (ent) 
		{
			ent.dirX ? ent.x++ : ent.x--;
			ent.dirY ? ent.y++ : ent.y--;
			
			if(ent.x+ent.width > CANVAS_WIDTH)
			{
				ent.dirX = 0;
			}
			if(ent.y+ent.height > CANVAS_HEIGHT)
			{
				ent.dirY = 0;
			}
			if(ent.x < 0)
			{
				ent.dirX = 1;
			}
			if(ent.y < 0)
			{
				ent.dirY = 1;
			}
		});
		
		//TODO collision off each other?
	};

	var start = function start()
	{
		canvas = document.getElementById('canvas1');
		ctx = canvas.getContext('2d');
		CANVAS_WIDTH = canvas.width;
		CANVAS_HEIGHT = canvas.height;

		for(var i=0; i< NUM_RECTS; i++)
		{
			entities.push(new box(Math.random()*30, Math.random()*30 ,Math.random()*300, Math.random()*300));
		}
		
		var loop = function loop()
		{
			move();
			update();
			draw();
		}

		setInterval( function() 
		{
			loop();
		}, 1000/FPS);
		/*var timer = setTimeout( function() 
		{
			loop();
			timer = setTimeout(arguments.callee, 1000/FPS)
		}, 1000/FPS);
		*/
		
	};
	start();
};

main();