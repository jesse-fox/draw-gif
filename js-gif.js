

function js_gif(options) {


	//Set defaults for options
	var options = options || {};
	options.target = options.target || {};


	//Setup variables
	var encoder = new GIFEncoder();
	var canvas = document.getElementById(options.target);
	var ctx = canvas.getContext("2d");

	canvas.height = 300;
	canvas.width = 300;

	var bg_color = "#409"

	encoder.setRepeat(0); //auto-loop
	encoder.setDelay(20); //~60FPS
	encoder.setSize(canvas.width, canvas.height);

	frame = 0;
	total_frames = 73;
	compile_gif = false;
	gif_done = false;

	var init = function() {

		encoder.start();

		animation_step();

	}

	var animation_step = function() {

		frame++;
		ctx.clearRect(0,0,canvas.width, canvas.height);
		ctx.fillStyle = bg_color;
		ctx.fillRect(0,0,canvas.width,canvas.height);


		var spiral_x = (125) * Math.sin( frame / 20 );
		var spiral_y = (100) * Math.sin( frame/40 );

		var resize = 5 * Math.sin( 10 + frame / 15 )



		//console.log( Math.sin(frame/30)* 5);


			circle({
				x: 150,
				y: 150 ,

				radius: 50,
				lineWidth: 20,
				color: "#FFF",
				fill: 1,
				fill_color: "#409"

			});




		circle({
			x: 150 + spiral_x,
			y: 150 + spiral_y ,

			radius: 10 + resize,
			lineWidth: 5,
			color: "#FFF",
			fill: 1,
			fill_color: "#99A"

		});



/*
	circle({
		x: 150,
		y:150 + spiral_y,

		radius: 15,
		lineWidth: 15,
		color: "#FFF",
		fill: 1,
		fill_color: "#99A"

	});
*/




		//Don't add frame or save unless compiling gif
		if (compile_gif) {

			add_frame();

		}

		//Start next frame
		requestAnimationFrame(animation_step);

	}


	add_frame = function() {

		if (!gif_done) {

			console.log("Frame: ", frame);
			encoder.addFrame(ctx);

			//Check if our gif has all needed frames
			if (frame >= total_frames) {

				encoder.finish();


				$("#output").append("<img>");

				$("#output img").attr("src",'data:image/gif;base64,'+encode64(encoder.stream().getData()));

				gif_done = true;

			}

		}

	}


	circle = function(settings) {
		settings = settings || {};

		settings.x = settings.x || 0;
		settings.offset_x = settings.offset_x || 0;
		settings.y = settings.y || 0;
		settings.offset_y = settings.offset_y || 0;
		settings.radius = settings.radius || 5;

		settings.stroke = settings.stroke || true;
		settings.fill = settings.fill || false;


		ctx.lineWidth = settings.lineWidth || 3;

		ctx.strokeStyle = settings.color || "#000000";
		ctx.fillStyle = settings.fill_color || "#000000";



		ctx.beginPath();

		ctx.arc(settings.x + settings.offset_x, settings.y + settings.offset_y, settings.radius,0,7);

		if (settings.stroke) ctx.stroke();

		if (settings.fill) ctx.fill();

		ctx.closePath();


	},

		wiggle = function(settings) {
			settings = settings || {};

			settings.type = settings.type || "sin";
			settings.seed = settings.seed || frame/10;
			settings.speed = settings.speed || 1;
			settings.range = settings.range || 1;

			settings.offset = settings.offset || 0;

			number = 0;

			if (settings.type == "sin") number = Math.sin(settings.seed * settings.speed + settings.offset) * settings.range;

			if (settings.type == "cos") number = Math.cos(settings.seed * settings.speed + settings.offset) * settings.range;


			return number;


		},

		stroke = function(settings){
			settings = settings || {};

			//Set defaults
			settings.start = settings.start || {x: 1, y: 1};
			settings.stop = settings.stop || {x: 1, y: 1};
			ctx.strokeStyle= settings.color || "#000000";
			ctx.lineWidth = settings.width || 5;
			ctx.lineCap = settings.cap || "round"; //"butt", "round", or "square"


			//Make stroke
			ctx.beginPath();

			ctx.moveTo(settings.start.x, settings.start.y);
			ctx.lineTo(settings.stop.x, settings.stop.y);
			ctx.stroke();

			ctx.closePath();

		} ,


		init();

}
