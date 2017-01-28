
$(function() {

    $("#canvas-wrap").append("<canvas id='main'></canvas>");


    function gif() {

        //Setup variables
        encoder = new GIFEncoder();
        canvas = document.getElementById("main");
        ctx = canvas.getContext("2d");

        canvas.height = 400;
        canvas.width = 400;

        bg_color = "#150530"

        encoder.setRepeat(0); //auto-loop
        encoder.setDelay(20); //~60FPS
        encoder.setSize(canvas.width, canvas.height);

        frame = 0;

        total_frames = 73;

        compile_gif = true;

        gif_done = false;

        init = function() {

            encoder.start();




            animation_step();

        }

        animation_step = function() {
            frame++;

           ctx.clearRect(0,0,200,200);

           ctx.fillStyle = bg_color;

           ctx.fillRect(0,0,canvas.width,canvas.height);



            for (i=0;i < 160; i++) {
                if (i % 1 == 0) {

                    spiral_x = (175-i) * Math.cos( i * 5 + -1 *frame/30);
                    spiral_y = (175-i) * Math.sin( i * 5 + -1 * frame/30);


                    circle({

                        x:200 + spiral_x,
                        y:200 + spiral_y,

                        radius: 3,
                        lineWidth: 2,
                        color: "#000",

                    });
                }
            }

            for (i=0;i < 180; i++) {
                if (i % 1 == 0) {

                    spiral_x = (175-i) * Math.cos( i * 1 + -1 *frame/50);
                    spiral_y = (175-i) * Math.sin( i * 1 + -1 * frame/50);


                    circle({

                        x:200 + spiral_x,
                        y:200 + spiral_y,

                        radius: 3,
                        lineWidth: 2,
                        color: "#002",

                    });
                }
            }


            for (i=0;i < 150; i++) {
                if (i % 1 == 0) {

                    spiral_x = (175-i) * Math.cos( i * 3 + -1 *frame/20);
                    spiral_y = (175-i) * Math.sin( i * 3 + -1 * frame/20);


                    circle({

                        x:200 + spiral_x,
                        y:200 + spiral_y,

                        radius: 3,
                        lineWidth: 2,
                        color: "#102",

                    });
                }
            }










            //Don't add frame or save unless compiling gif
            if (compile_gif) {

                add_frame();

            }

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


        init();

    }

    var new_gif = new gif();

});


