

function js_gif(options) {

	var self = this;

	//Set defaults for options
	var options = options || {};
	//self.options.target = self.options.target || {};


	//Setup variables
	self.encoder = new GIFEncoder();
	self.canvas = document.createElement("canvas");
	self.ctx = self.canvas.getContext("2d");

	$("body").append(self.canvas);


	self.canvas.height = options.height || 300;
	self.canvas.width = options.width || 300;


	self.encoder.setRepeat(0); //auto-loop
	self.encoder.setDelay(20); //~60FPS
	self.encoder.setSize(self.canvas.width, self.canvas.height);

	self.frame = options.frame || 0;
	self.total_frames = options.total_frames || 20;
	self.compile_gif = options.compile_gif || false;
	self.gif_done = false;


	// Init runs on object creation to set anim up and start it
	self.init = function() {


		self.encoder.start();

		self.animation_step();

	};

	self.animation_step = function() {

		self.frame++;

		// Call the draw function that was passed in
		options.draw(self.ctx, self.frame);


		//Don't add frame or save unless compiling gif
		if (self.compile_gif) {

			self.add_frame();

		}

		//Start next frame
		requestAnimationFrame(self.animation_step);

	};


	self.add_frame = function() {

		if (!self.gif_done) {

			console.log("Frame: ", self.frame);
			self.encoder.addFrame(self.ctx);

			//Check if our gif has all needed frames
			if (self.frame >= self.total_frames) {

				self.encoder.finish();


				$("body").append("<img id='output'>");

				$("#output").attr("src",'data:image/gif;base64,'+encode64(self.encoder.stream().getData()));

				self.gif_done = true;

				//Hack to stop script from continuing, so you can see exactly where it stopped
				throw new Error("GIF is done!");


			}

		}

	};

	// Automatically run init on creation.
	self.init();

}



// Draw circle shape with given settings
var circle = function(ctx, settings) {

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


var wiggle = function(ctx, settings) {
	settings = settings || {};

	settings.type = settings.type || "sin";
	settings.seed = settings.seed || frame/10;
	settings.speed = settings.speed || 1;
	settings.range = settings.range || 1;

	settings.offset = settings.offset || 0;

	var number = 0;

	if (settings.type == "sin") number = Math.sin(settings.seed * settings.speed + settings.offset) * settings.range;

	if (settings.type == "cos") number = Math.cos(settings.seed * settings.speed + settings.offset) * settings.range;


	return number;


};


var stroke = function(ctx, settings){
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
