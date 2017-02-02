

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

	var bg_color = "#451098";

	encoder.setRepeat(0); //auto-loop
	encoder.setDelay(20); //~60FPS
	encoder.setSize(canvas.width, canvas.height);

	frame = 0;
	total_frames = 73;
	compile_gif = false;
	gif_done = false;



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





		//Start next frame
		requestAnimationFrame(animation_step);

	}




}



//Wait for DOM ready.
$(function() {

	//Add a canvas to the page to paint on
	$("#canvas-wrap").append("<canvas id='main'></canvas>");

	//Make a new gif and set its target
	var new_gif = new js_gif({ target: "main"});

});
