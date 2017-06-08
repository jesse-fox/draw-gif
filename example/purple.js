
$(function() {

    $("body").append("<canvas id='main'></canvas>");


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


            position_one = 1;
            position_two = 2;


            position_three = 2.5;
            position_four = 1.5;


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

            ctx.arc(100, 100, 80, position_one * Math.PI, position_two * Math.PI);

            ctx.arc(100, 100, 60, position_two * Math.PI, position_one * Math.PI);

            ctx.arc(100, 100, 40, position_four * Math.PI, position_three * Math.PI);

            ctx.arc(100, 100, 20,position_three * Math.PI, position_four * Math.PI);
            ctx.closePath();
            ctx.stroke();

            ctx.beginPath();
            ctx.strokeStyle = "#ff88ff";

            ctx.arc(100, 100, 75, position_one * Math.PI, position_two * Math.PI);

            ctx.arc(100, 100, 55, position_two * Math.PI, position_one * Math.PI);

            ctx.arc(100, 100, 35, position_four * Math.PI, position_three * Math.PI);

            ctx.arc(100, 100, 15,position_three * Math.PI, position_four * Math.PI);



            ctx.stroke();

            ctx.closePath();


            position_one += .01;
            position_two += .01;

            position_three -= .01;
            position_four -= .01;


            steps++;

            console.log(steps);


            requestAnimationFrame(animation_step);


        }


        init();

    }

    var new_gif = new gif();

});
