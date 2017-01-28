
$(function() {

    $("#canvas-wrap").append("<canvas id='main'></canvas>");


    function gif() {

        //Setup variables
        encoder = new GIFEncoder();
        canvas = document.getElementById("main");
        ctx = canvas.getContext("2d");



        init = function() {


            encoder.setRepeat(0); //auto-loop
            encoder.setDelay(15); //~60FPS
            encoder.start();


            canvas.height = 200;
            canvas.width = 200;


            qs = 1;
            qe = 2;

            ws = 2;
            we =1;

            es = 1.5;
            ee = 2.5;

            rs = 2.5;
            re = 1.5;


            steps = 0;



            animation_step();

        }

        animation_step = function() {



            ctx.clearRect(0,0,200,200);

            ctx.fillStyle = "#737";

            ctx.fillRect(0,0,200,200);


            ctx.lineWidth = 5;

            ctx.strokeStyle = "#000000";

            ctx.beginPath();

            ctx.arc(100, 100, 80, qs * Math.PI, qe * Math.PI);

            ctx.arc(100, 100, 60, ws * Math.PI, we * Math.PI);

            ctx.arc(100, 100, 40, es * Math.PI, ee * Math.PI);

            ctx.arc(100, 100, 20,rs * Math.PI, re * Math.PI);
            ctx.closePath();
            ctx.stroke();

            ctx.beginPath();
            ctx.strokeStyle = "#ff88ff";

            ctx.arc(100, 100, 75, qs * Math.PI, qe * Math.PI);

            ctx.arc(100, 100, 55, ws * Math.PI, we * Math.PI);

            ctx.arc(100, 100, 35, es * Math.PI, ee * Math.PI);

            ctx.arc(100, 100, 15,rs * Math.PI, re * Math.PI);



            ctx.stroke();

            ctx.closePath();


            qs += .01;
            qe += .01;

            ws -= .01;
            we -= .01;

            es += .01;
            ee += .01;

            rs -= .01;
            re -= .01;


            steps++;
            console.log(steps);

            encoder.addFrame(ctx);

            if (steps == 10) {

                encoder.finish();

                $output = $("#output").append("<img>");

                $output.attr("src",'data:image/gif;base64,'+encode64(encoder.stream().getData()))

            }

            requestAnimationFrame(animation_step);


        }


        init();

    }

    var new_gif = new gif();

});


