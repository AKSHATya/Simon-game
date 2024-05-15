var seq = [];
var level = 1;
var ind =0;
var gameStarted = false;

function makesound(num) {
    var sound;
    switch (num) {
        case 0:
            sound = new Audio('./sounds/green.mp3');
            $(".green").addClass("pressed");
            setTimeout(function() {
                $(".green").removeClass("pressed");
            }, 500);
            break;
        case 1:
            sound = new Audio('./sounds/red.mp3');
            $(".red").addClass("pressed");
            setTimeout(function() {
                $(".red").removeClass("pressed");
            }, 500);
            break;
        case 2:
            sound = new Audio('./sounds/yellow.mp3');
            $(".yellow").addClass("pressed");
            setTimeout(function() {
                $(".yellow").removeClass("pressed");
            }, 500);
            break;
        case 3:
            sound = new Audio('./sounds/blue.mp3');
            $(".blue").addClass("pressed");
            setTimeout(function() {
                $(".blue").removeClass("pressed");
            }, 500);
            break;
    }
    sound.play();
}

function wrongsound() {
    $('body').addClass("game-over");
    var sound = new Audio('./sounds/wrong.mp3');
    sound.play();
    setTimeout(function() {
        $('body').removeClass("game-over");
    }, 500);
    // level = 0;
    $('#level-title').html("Game Over, press any key to start new game");
    level =1;
    gameStarted = false;
}

function nextsequence() {
    var num = Math.floor(Math.random() * 4);
    makesound(num);
    seq.push(num);
}

$(document).on("keydown", function (event) {
    if (!gameStarted) {
        nextsequence();
        gameStarted = true;
        $('#level-title').html("level "+ level);
    }
});

$(".btn").on("click", function (event) {
    if (gameStarted) {
        var clickedButtonIndex = $(".btn").index(this);
        if (clickedButtonIndex === seq[ind]) {
            makesound(clickedButtonIndex);
            ind++;
            if (ind === seq.length) {
                setTimeout(nextsequence, 1000); 
                ind = 0;
                level++;

                setTimeout(function(){$('#level-title').html("level "+ level);}, 1500);
            }
        } else {
            makesound(clickedButtonIndex);
            seq = [];
            ind = 0;
            wrongsound();
        }
    }
});
