

function js_gif(options) {

	var self = this;

	//Set defaults for options
	var options = options || {};
	//self.options.target = self.options.target || {};


	//Setup variables
	var encoder = new GIFEncoder();
	var canvas = document.createElement("canvas");
	var ctx = canvas.getContext("2d");

	$("body").append(canvas);


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


	// Init runs on object creation to set anim up and start it
	self.init = function() {


		encoder.start();

		self.animation_step();

	};

	self.animation_step = function() {

		frame++;
		
		options.draw(ctx, frame);


		//Don't add frame or save unless compiling gif
		if (compile_gif) {

			add_frame();

		}

		//Start next frame
		requestAnimationFrame(self.animation_step);

	};


	self.add_frame = function() {

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

	};

	// Automatically run init on creation.
	self.init();

}


function gif_helper() {


	// Draw circle shape with given settings
	circle = function(settings) {

		settings = settings || {};

		settings.x = settings.x || 0;
		settings.y = settings.y || 0;
		settings.offset_y = settings.offset_y || 0;
		settings.offset_x = settings.offset_x || 0;

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


	};

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

	};



}

