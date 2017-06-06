
$(function() {

    $("#canvas-wrap").append("<canvas id='main'></canvas>");


    function gif() {

        //Setup variables
        encoder = new GIFEncoder();
        canvas = document.getElementById("main");
        ctx = canvas.getContext("2d");

        canvas.height = 100;
        canvas.width = 300;

        bg_color = "#ff7733"

        encoder.setRepeat(0); //auto-loop
        encoder.setDelay(15); //~60FPS
        encoder.setSize(canvas.width, canvas.height);

        frame = 0;

        total_frames = 63;

        compile_gif = false;

        gif_done = false;

        init = function() {

            encoder.start();

			ctx.fillStyle = bg_color;
			ctx.lineWidth = 3;
            ctx.strokeStyle = "#fff";


			movement = 1;


            animation_step();

        }

        animation_step = function() {


            ctx.clearRect(0, 0, canvas.width, canvas.height);

			// Add BG color
            ctx.fillRect(0, 0, canvas.width, canvas.height);

			movement += .1;


ctx.strokeStyle = "#336699";
			// First set of circles
			for ( var i = 1; i < 6; i++ ) {


				// Move each over 50px
				var offset_x = (50 * i) + (25 * Math.sin( movement ));

				// Alternative path for more variance
				if ( i % 2 == 0 ) {
					var offset_y = 25 * Math.sin(movement) + canvas.height/10 * 4;
				} else {
					var offset_y = 25 * Math.cos(movement) + canvas.height/10 * 4;
				}


				ctx.beginPath();
	            ctx.arc( offset_x, offset_y, 5,100,122);
	            ctx.stroke();
	            ctx.closePath();

			} // for

			ctx.strokeStyle = "#FFFFFF";


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

                    $("#output img").attr("src",'data:image/gif;base64,'+encode64(encoder.stream().getData()));

                    gif_done = true;

                }

            }

        } // add_frame


        init();

    } // gif


	// Start the animation when object is created
    var new_gif = new gif();

});
