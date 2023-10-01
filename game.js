const buttonColours = ["red", "blue", "green", "yellow"];
let gamePattern = [];
let userChosenPattern = [];
let level = 0;
let waitTime = 0;

$("html").on("keypress", nextSequence);
$("html").on("click", nextSequence);

function playSound(colour) {
    let audio = new Audio("./sounds/" + colour + ".mp3");
    audio.play();
}

function repeatSequence() {
    for (let i = 0; i < gamePattern.length; i++) {
        setTimeout(function() {
            animateSelection(gamePattern[i]);
        }, i * 1000);
    }
}

function nextSequence() {
    $("html").off("keypress");
    $("html").off("click");
    level++;
    $("h1").text("Level " + level);
    repeatSequence();
    setTimeout(function () {
        let randomNumber = Math.floor(Math.random() * 4);
        let randomChosenColour = buttonColours[randomNumber];
        gamePattern.push(randomChosenColour);
        animateSelection(randomChosenColour);
        userChosenPattern = [];
    }, waitTime);
    waitTime += 1000;
    setTimeout(activateKeys, waitTime + 100);
}

function animateSelection(colour) {
    $("#" + colour).animate({
        opacity: 0,
    });
    playSound(colour);
    $("#" + colour).animate({
        opacity: 1,
    });
}

function animatePress(colour) {
    $("#" + colour).addClass("pressed");
    playSound(colour);
    setTimeout(function () {
        $("#" + colour).removeClass("pressed");
    }, 100);
}

function activateKeys() {
    $(".btn").on("click", function () {
        let userChosenColor = this.id;
        userChosenPattern.push(userChosenColor);
        animatePress(userChosenColor);
        console.log(userChosenColor);
        checkKey(userChosenPattern.length - 1);
    });
}

function playCorrect() {
    $("body").css("background-color", "green");
    setTimeout(function() {
        $("body").css("background-color", "#011F3F")
    }, 100);
    let audio = new Audio("./sounds/Correct.mp3");
    audio.play();
}

function playOver() {
    $("body").css("background-color", "red");
    setTimeout(function() {
        $("body").css("background-color", "#011F3F")
    }, 100);
    let audio = new Audio("./sounds/Game Over.mp3");
    audio.play();
    setTimeout(resetGame, 4000);
}

function checkKey(i) {
    if (gamePattern[i] === userChosenPattern[i]) {
        if (i == gamePattern.length - 1) {
            $(".btn").off("click");
            setTimeout(playCorrect, 200);
            setTimeout(nextSequence, 2000);
        }
    } else {
        $("h1").text("Game Over");
        $(".btn").off("click");
        playOver();
    }
}

function resetGame() {
    level = 0;
    $("h1").text("Press A Key to Start");
    gamePattern = [];
    waitTime = 0;
    $("html").on("keypress", nextSequence);
    $("html").on("click", nextSequence);
}