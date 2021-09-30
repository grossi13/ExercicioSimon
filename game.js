var gamePattern = [];
var userClickedPatter = [];
var buttonColors = ["red", "blue", "green", "yellow"];
var level = 0;
var started = false;
$("body").keydown(function(){
    if(!started){
        nextSequence();
        $("#level-title").text("Level 0");
        started = true;
    }
});

function nextSequence(){
    userClickedPatter = [];
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);
    $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColor);
    level++;
    $("#level-title").text("Level "+level);
}

$(".btn").on("click", function(){
    var userChosenColor = $(this).attr("id");
    userClickedPatter.push(userChosenColor);
    playSound(userChosenColor);
    animatePress(userChosenColor);
    checkAnswer(userClickedPatter.length -1);
});

function playSound(name) {
    var audio = new Audio("sounds/"+ name + ".mp3");
    audio.play();
}

function animatePress(currentColor){
    $("#"+ currentColor +".btn").addClass("pressed");
    setTimeout(function(){
        $("#"+ currentColor +".btn").removeClass("pressed");
    },100);
}

function checkAnswer(currentLevel){
    if(userClickedPatter[currentLevel] === gamePattern[currentLevel]){
        console.log("MESMA COR CERTO");
        if(userClickedPatter.length === gamePattern.length){
            setTimeout(function(){
                nextSequence();
            },1000);    
        }        
    }
    else{
        var audio2 = new Audio("sounds/wrong.mp3");
        audio2.play();
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        },200)
        $("h1").text("Game Over, Press Any Key to Restart");
        startOver();
    }
}

function startOver(){
    level = 0;
    gamePattern = [];
    started = false;
    userClickedPatter = [];
}

