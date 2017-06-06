
$(function() {

    $("#canvas-wrap").append("<canvas id='main'></canvas>");


    function gif() {

        //Setup variables
        encoder = new GIFEncoder();
        canvas = document.getElementById("main");
        ctx = canvas.getContext("2d");

        canvas.height = 100;
        canvas.width = 400;

        bg_color = "#ff7733"

        encoder.setRepeat(0); //auto-loop
        encoder.setDelay(15); //~60FPS
        encoder.setSize(canvas.width, canvas.height);

        frame = 0;

        total_frames = 63;

        compile_gif = true;

        gif_done = false;

        init = function() {

            encoder.start();





            qs = 1;
            qe = 2;

            ws = 2;
            we = 1;

            es = 1.5;
            ee = 2.5;

            rs = 2.5;
            re = 1.5;






            animation_step();

        }

        animation_step = function() {



            ctx.clearRect(0,0,200,200);

            ctx.fillStyle = bg_color;

            ctx.fillRect(0,0,canvas.width,canvas.height);


            ctx.lineWidth = 3;

            ctx.strokeStyle = "#fff";


            ctx.beginPath();

            ctx.arc(50 + 25 * Math.sin(qe + re ), 25 * Math.sin(qs) + canvas.height/10 * 4, 5,100,122);
            ctx.stroke();

            ctx.closePath();


            ctx.beginPath();

            ctx.arc(100 + 25 * Math.sin(qe + re ) , 25 * Math.cos(qs) + canvas.height/10 * 4, 5,100,122);
            ctx.stroke();

            ctx.closePath();


            ctx.beginPath();

            ctx.arc(150 + 25 * Math.sin(qe + re ) , 25 * Math.sin(qs) + canvas.height/10 * 4, 5,100,122);
            ctx.stroke();

            ctx.closePath();


            ctx.beginPath();

            ctx.arc(200 + 25 * Math.sin(qe + re ) , 25 * Math.cos(qs) + canvas.height/10 * 4, 5,100,122);
            ctx.stroke();

            ctx.closePath();


            ctx.beginPath();

            ctx.arc(250 + 25 * Math.sin(qe + re ) , 25 * Math.sin(qs) + canvas.height/10 * 4, 5,100,122);
            ctx.stroke();

            ctx.closePath();


            ctx.beginPath();

            ctx.arc(300 + 25 * Math.sin(qe + re ) , 25 * Math.cos(qs) + canvas.height/10 * 4, 5,100,122);
            ctx.stroke();

            ctx.closePath();


            ctx.beginPath();

            ctx.arc(350 + 25 * Math.sin(qe + re ) , 25 * Math.sin(qs) + canvas.height/10 * 4, 5,100,122);
            ctx.stroke();

            ctx.closePath();






            //////

            //third set


            ctx.beginPath();

            ctx.arc(50  ,40 * Math.sin(qs + 47) + canvas.height/2, 5,100,122);
            ctx.stroke();

            ctx.closePath();


            ctx.beginPath();

            ctx.arc(100 ,40 * Math.cos(qs + 35) + canvas.height/2, 5,100,122);
            ctx.stroke();

            ctx.closePath();


            ctx.beginPath();

            ctx.arc(150  ,40 * Math.sin(qs + 47) + canvas.height/2, 5,100,122);
            ctx.stroke();

            ctx.closePath();


            ctx.beginPath();

            ctx.arc(200 ,40 * Math.cos(qs + 35) + canvas.height/2, 5,100,122);
            ctx.stroke();

            ctx.closePath();


            ctx.beginPath();

            ctx.arc(250 , 40 * Math.sin(qs  + 47) + canvas.height/2, 5,100,122);
            ctx.stroke();

            ctx.closePath();


            ctx.beginPath();

            ctx.arc(300,40 * Math.cos(qs + 35) + canvas.height/2, 5,100,122);
            ctx.stroke();

            ctx.closePath();


            ctx.beginPath();

            ctx.arc(350 ,40 * Math.sin(qs + 47) + canvas.height/2, 5,100,122);
            ctx.stroke();

            ctx.closePath();





            //second set


            ctx.beginPath();

            ctx.arc(50 + 25 * Math.sin(qe + rs) ,-1* 25 * Math.cos(qs) + canvas.height/10*6, 5,100,122);
            ctx.stroke();

            ctx.closePath();


            ctx.beginPath();

            ctx.arc(100  + 25 * Math.sin(qe + rs),-1* 25 * Math.sin(qs) + canvas.height/10*6, 5,100,122);
            ctx.stroke();

            ctx.closePath();


            ctx.beginPath();

            ctx.arc(150 + 25 * Math.sin(qe + rs) ,-1* 25 * Math.cos(qs) + canvas.height/10*6, 5,100,122);
            ctx.stroke();

            ctx.closePath();


            ctx.beginPath();

            ctx.arc(200 + 25 * Math.sin(qe + rs) ,-1* 25 * Math.sin(qs) + canvas.height/10*6, 5,100,122);
            ctx.stroke();

            ctx.closePath();


            ctx.beginPath();

            ctx.arc(250 + 25 * Math.sin(qe + rs) ,-1* 25 * Math.cos(qs) + canvas.height/10*6, 5,100,122);
            ctx.stroke();

            ctx.closePath();


            ctx.beginPath();

            ctx.arc(300 + 25 * Math.sin(qe + rs) ,-1* 25 * Math.sin(qs) + canvas.height/10*6, 5,100,122);
            ctx.stroke();

            ctx.closePath();


            ctx.beginPath();

            ctx.arc(350  + 25 * Math.sin(qe + rs),-1* 25 * Math.cos(qs) + canvas.height/10*6, 5,100,122);
            ctx.stroke();

            ctx.closePath();









            qs += .1;
            qe += .1;

            ws -= .01;
            we -= .01;

            es += .1;
            ee += .1;

            rs - 10;
            re - 10;




            //Don't add frame or save unless compiling gif
            if (compile_gif) {

                add_frame();

            }

            requestAnimationFrame(animation_step);

        }

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

        }


        init();

    }

    var new_gif = new gif();

});


