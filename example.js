


//Wait for DOM ready.
$(function() {

	//Add a canvas to the page to paint on
	//$("#canvas-wrap").append("<canvas id='main'></canvas>");

	// Create new gif with options!
	var new_gif = new js_gif({
		target: "main",
		bg_color: "#123456",

		//When you're happy with your animation, change this to true to save as a gif
		compile: false,

		draw: draw
	});

});



function draw( ctx, frame ) {

	frame++;
	//ctx.clearRect(0,0,canvas.width, canvas.height);
	ctx.fillStyle = "#123";
	//ctx.fillRect(0,0,canvas.width,canvas.height);
	ctx.fillRect(0,0,300, 300);


	var spiral_x = (125) * Math.sin( frame / 20 );
	var spiral_y = (100) * Math.sin( frame / 40 );

	var resize = 5 * Math.sin( 10 + frame / 15 );



	//console.log( Math.sin(frame/30)* 5);


	circle(ctx, {
		x: 150,
		y: 150 ,

		radius: 50,
		lineWidth: 20,
		color: "#FFF",
		fill: 1,
		fill_color: "#409"

	});




	circle(ctx, {
		x: 150 + spiral_x,
		y: 150 + spiral_y ,

		radius: 10 + resize,
		lineWidth: 5,
		color: "#FFF",
		fill: 1,
		fill_color: "#99A"

	});






} // draw()
