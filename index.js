var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];

var userClickedPattern = [];

var started = false;

var level = 0;

function nextSequence() {
  userClickedPattern = [];
  level++;
  $("#level-title").text("Level " + level);
  var randomNumber = Math.floor(Math.random() * 3) + 1;
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

  playSound(randomChosenColour);
}


$(".btn").click(function() {

  var userChosenColour = $(this).attr("id");

  userClickedPattern.push(userChosenColour);


  playSound(userChosenColour);

  animatePress(userChosenColour);

  checkAnswer(userClickedPattern.length - 1);
  console.log(userClickedPattern);
});


function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}


function animatePress(currentKey) {

  var activeButton = document.querySelector("#" + currentKey);

  activeButton.classList.add("pressed");

  setTimeout(function() {
    activeButton.classList.remove("pressed");
  }, 100);

}

$(document).keypress(function() {
  if (!started) {

    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});

$(document).click(function() {
  if (!started) {

    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});

function checkAnswer(currentLevel) {

  //3. Write an if statement inside checkAnswer() to check if the most recent user answer is the same as the game pattern. If so then log "success", otherwise log "wrong".
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {

    console.log("success");

    //4. If the user got the most recent answer right in step 3, then check that they have finished their sequence with another if statement.
    if (userClickedPattern.length === gamePattern.length) {

      //5. Call nextSequence() after a 1000 millisecond delay.
      setTimeout(function() {
        nextSequence();
      }, 1000);

    }

  } else {

    console.log("wrong");

    //1. In the sounds folder, there is a sound called wrong.mp3, play this sound if the user got one of the answers wrong.
    playSound("wrong");

    //2. In the styles.css file, there is a class called "game-over", apply this class to the body of the website when the user gets one of the answers wrong and then remove it after 200 milliseconds.
    $("body").addClass("game-over");
    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);

    //3. Change the h1 title to say "Game Over, Press Any Key to Restart" if the user got the answer wrong.
    $("#level-title").text("Game Over, Press Any Key to Restart");

    startOver();
  }

}


function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}
