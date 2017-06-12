
// Old file, may be messy

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





            position_one = 1;
            position_two = 2;

            position_three = 2;
            position_four = 1;


            position_five = 2.5;
            position_six = 1.5;






            animation_step();

        }

        animation_step = function() {



            ctx.clearRect(0,0,200,200);

            ctx.fillStyle = bg_color;

            ctx.fillRect(0,0,canvas.width,canvas.height);


            ctx.lineWidth = 3;

            ctx.strokeStyle = "#fff";


            ctx.beginPath();

            ctx.arc(50 + 25 * Math.sin(position_two + position_six ), 25 * Math.sin(position_one) + canvas.height/10 * 4, 5,100,122);
            ctx.stroke();

            ctx.closePath();


            ctx.beginPath();

            ctx.arc(100 + 25 * Math.sin(position_two + position_six ) , 25 * Math.cos(position_one) + canvas.height/10 * 4, 5,100,122);
            ctx.stroke();

            ctx.closePath();


            ctx.beginPath();

            ctx.arc(150 + 25 * Math.sin(position_two + position_six ) , 25 * Math.sin(position_one) + canvas.height/10 * 4, 5,100,122);
            ctx.stroke();

            ctx.closePath();


            ctx.beginPath();

            ctx.arc(200 + 25 * Math.sin(position_two + position_six ) , 25 * Math.cos(position_one) + canvas.height/10 * 4, 5,100,122);
            ctx.stroke();

            ctx.closePath();


            ctx.beginPath();

            ctx.arc(250 + 25 * Math.sin(position_two + position_six ) , 25 * Math.sin(position_one) + canvas.height/10 * 4, 5,100,122);
            ctx.stroke();

            ctx.closePath();


            ctx.beginPath();

            ctx.arc(300 + 25 * Math.sin(position_two + position_six ) , 25 * Math.cos(position_one) + canvas.height/10 * 4, 5,100,122);
            ctx.stroke();

            ctx.closePath();


            ctx.beginPath();

            ctx.arc(350 + 25 * Math.sin(position_two + position_six ) , 25 * Math.sin(position_one) + canvas.height/10 * 4, 5,100,122);
            ctx.stroke();

            ctx.closePath();






            //////

            //third set


            ctx.beginPath();

            ctx.arc(50  ,40 * Math.sin(position_one + 47) + canvas.height/2, 5,100,122);
            ctx.stroke();

            ctx.closePath();


            ctx.beginPath();

            ctx.arc(100 ,40 * Math.cos(position_one + 35) + canvas.height/2, 5,100,122);
            ctx.stroke();

            ctx.closePath();


            ctx.beginPath();

            ctx.arc(150  ,40 * Math.sin(position_one + 47) + canvas.height/2, 5,100,122);
            ctx.stroke();

            ctx.closePath();


            ctx.beginPath();

            ctx.arc(200 ,40 * Math.cos(position_one + 35) + canvas.height/2, 5,100,122);
            ctx.stroke();

            ctx.closePath();


            ctx.beginPath();

            ctx.arc(250 , 40 * Math.sin(position_one  + 47) + canvas.height/2, 5,100,122);
            ctx.stroke();

            ctx.closePath();


            ctx.beginPath();

            ctx.arc(300,40 * Math.cos(position_one + 35) + canvas.height/2, 5,100,122);
            ctx.stroke();

            ctx.closePath();


            ctx.beginPath();

            ctx.arc(350 ,40 * Math.sin(position_one + 47) + canvas.height/2, 5,100,122);
            ctx.stroke();

            ctx.closePath();





            //second set


            ctx.beginPath();

            ctx.arc(50 + 25 * Math.sin(position_two + position_five) ,-1* 25 * Math.cos(position_one) + canvas.height/10*6, 5,100,122);
            ctx.stroke();

            ctx.closePath();


            ctx.beginPath();

            ctx.arc(100  + 25 * Math.sin(position_two + position_five),-1* 25 * Math.sin(position_one) + canvas.height/10*6, 5,100,122);
            ctx.stroke();

            ctx.closePath();


            ctx.beginPath();

            ctx.arc(150 + 25 * Math.sin(position_two + position_five) ,-1* 25 * Math.cos(position_one) + canvas.height/10*6, 5,100,122);
            ctx.stroke();

            ctx.closePath();


            ctx.beginPath();

            ctx.arc(200 + 25 * Math.sin(position_two + position_five) ,-1* 25 * Math.sin(position_one) + canvas.height/10*6, 5,100,122);
            ctx.stroke();

            ctx.closePath();


            ctx.beginPath();

            ctx.arc(250 + 25 * Math.sin(position_two + position_five) ,-1* 25 * Math.cos(position_one) + canvas.height/10*6, 5,100,122);
            ctx.stroke();

            ctx.closePath();


            ctx.beginPath();

            ctx.arc(300 + 25 * Math.sin(position_two + position_five) ,-1* 25 * Math.sin(position_one) + canvas.height/10*6, 5,100,122);
            ctx.stroke();

            ctx.closePath();


            ctx.beginPath();

            ctx.arc(350  + 25 * Math.sin(position_two + position_five),-1* 25 * Math.cos(position_one) + canvas.height/10*6, 5,100,122);
            ctx.stroke();

            ctx.closePath();









            position_one += .1;
            position_two += .1;

            position_three -= .01;
            position_four -= .01;



            position_five -= 10;
            position_six - 10;




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
