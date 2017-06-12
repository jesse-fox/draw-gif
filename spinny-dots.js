
// If you want to alter the animation, it will be easiest to only show 1 group of dots at a time!

$(function() {

    $("#canvas-wrap").append("<canvas id='main'></canvas>");


    function gif() {

        //Setup variables
        encoder = new GIFEncoder();
        canvas = document.getElementById("main");
        ctx = canvas.getContext("2d");

        canvas.height = 100;
        canvas.width = 300;

		bg_color = "#fe2ba9"
        line_color = "#FFF"

        encoder.setRepeat(0); //auto-loop
        encoder.setDelay(15); //~60FPS
        encoder.setSize(canvas.width, canvas.height);

        frame = 0;

		// There's no trick to finding the perfect loop point, just trial & err
        total_frames = 63;

		// Keep false while editing the gif
        compile_gif = true;

        gif_done = false;

        init = function() {

            encoder.start();

			ctx.fillStyle = bg_color;
			ctx.lineWidth = 3;
            ctx.strokeStyle = line_color;


			movement = 1;


            animation_step();

        }

        animation_step = function() {


            ctx.clearRect(0, 0, canvas.width, canvas.height);

			// Add BG color
            ctx.fillRect(0, 0, canvas.width, canvas.height);

			movement += .1;


			// First set of circles
			for ( var i = 1; i < 6; i++ ) {


				// Move each over 50px

				// Alternative path for more variance
				if ( i % 2 == 0 ) {
					var offset_x = (50 * i) + (18 * Math.sin( movement - 20));
					var offset_y = 25 * Math.sin(movement+5) + canvas.height/ 3;
				} else {
					var offset_x = (50 * i) + (30 * Math.sin( movement - 10));
					var offset_y = 25 * Math.cos(movement + 20) + canvas.height/ 2.5;
				}


				ctx.beginPath();
	            ctx.arc( offset_x, offset_y, 5,100,122);
	            ctx.stroke();
	            ctx.closePath();

			} // for



			// Second set
			for ( var i = 1; i < 6; i++ ) {


				// Move each over 50px
				var offset_x = (50 * i) + (-25 * Math.cos( movement ));

				// Alternative path for more variance
				if ( i % 2 == 0 ) {
					var offset_y = -25 * Math.cos(movement) + canvas.height / 1.6;
				} else {
					var offset_y = -30 * Math.sin(movement + 10) + canvas.height / 2;
				}


				ctx.beginPath();
	            ctx.arc( offset_x, offset_y, 5,100,122);
	            ctx.stroke();
	            ctx.closePath();

			} // for



			// third set
			for ( var i = 1; i < 6; i++ ) {


				// Move each over 50px
				var offset_x = (50 * i);

				// Alternative path for more variance
				if ( i % 2 == 0 ) {
					var offset_y = 40 * Math.sin(movement) + canvas.height/2;
				} else {
					var offset_y = 40 * Math.cos(movement) + canvas.height/2;
				}


				ctx.beginPath();
	            ctx.arc( offset_x, offset_y, 5,100,122);
	            ctx.stroke();
	            ctx.closePath();

			} // for






            //Don't add frame or save unless compiling gif
            if (compile_gif) {

                add_frame();

            }

			// Go to next frame
            requestAnimationFrame(animation_step);

        } // draw


		// Add the current canvas to the next frame in the gif
        add_frame = function() {

            if (!gif_done) {

                frame++;
                console.log("Frame: ", frame);
                encoder.addFrame(ctx);

                //Check if our gif has all needed frames
                if (frame >= total_frames) {

                    encoder.finish();

                    $("#output").append("<img>");

					var img = 'data:image/gif;base64,'+encode64(encoder.stream().getData());

                    $("#output img").attr("src", img);

                    gif_done = true;

                }

            }

        } // add_frame


        init();

    } // gif


	// Start the animation when object is created
    var new_gif = new gif();

});
