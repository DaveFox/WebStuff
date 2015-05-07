function pathMain()
{

	//local scope variables
	var canvas = null,
		ctx = null,
		CANVAS_WIDTH = 0,
		CANVAS_HEIGHT = 0,
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
	
	var drawGrid = function drawGrid()
	{
		ctx.fillStyle = "black";
		
		ctx.moveTo(20, 0);
		ctx.lineTo(20, CANVAS_HEIGHT);
		
		ctx.stroke();
	};

	var update = function update()
	{
		ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
		drawGrid();
	};

	var draw = function draw()
	{
		entities.forEach(function (ent)
		{
			ent.draw();
		});
		
		ctx.fillStyle = "blue";
		ctx.fillRect(CANVAS_WIDTH-25,5,20,20);
	};

	var move = function move()
	{
		//canvas bounds checking
		entities.forEach(function (ent) 
		{	
			if(ent.x+ent.width > CANVAS_WIDTH)
			{
				ent.x = CANVAS_WIDTH -ent.width;
			}
			if(ent.y+ent.height > CANVAS_HEIGHT)
			{
				ent.y = CANVAS_HEIGHT -ent.height;
			}
			if(ent.x < 0)
			{
				ent.x = 1;
			}
			if(ent.y < 0)
			{
				ent.x = 1;
			}
		});
	};

	var startPath = function startPath()
	{
		canvas = document.getElementById('canvas2');
		ctx = canvas.getContext('2d');
		CANVAS_WIDTH = canvas.width;
		CANVAS_HEIGHT = canvas.height;

		entities.push(new box(20, 20 ,0, 100));

		setInterval( function() 
		{
			move();
			update();
			draw();
		}, 1000/FPS);
		
	};

	startPath();
};

pathMain();