const START = document.querySelector("#start");
const STOP = document.querySelector("#stop");
const RESET = document.querySelector("#reset");

var workDecrementButton = document.querySelector(".work-decrement");
var workIncrementButton = document.querySelector(".work-increment");
var breakDecrementButton = document.querySelector(".break-decrement");
var breakIncrementButton = document.querySelector(".break-increment");

var workText = document.querySelector("span.worklength");
var breakText = document.querySelector("span.breaklength");

var circleTimer = document.querySelector(".chart_circle");
var number = document.querySelector("text");

var interval;

var circumference = 2 * Math.PI * 80;

function leadingZero(val) {
  if (val <= 9)
    val = "0" + val;
  return val;
}

var currentTime;
var currentStrokeLength = 0;

var workValue = workText.innerHTML;
var breakValue = breakText.innerHTML;
var timer = [workValue, 0, workValue * 60]; // minute, second

var workRunTimer = true;



function playSound() {
  var au = new Audio('https://s3-us-west-2.amazonaws.com/s.cdpn.io/123941/Yodel_Sound_Effect.mp3')
  au.play();
};

function runTimer() {
  // switch timer when times up
  if (workRunTimer == true) {
    fixed = workValue * 60;
    circleTimer.setAttribute("stroke", "#0f459b");

    if (timer[2] == 0) {
      playSound();
      workRunTimer = false;
      timer = [breakValue, 0, breakValue * 60];
      fixed = breakValue * 60;
      currentStrokeLength = 0;
      runTimer();
    }
  } else {
    fixed = breakValue * 60;
    circleTimer.setAttribute("stroke", "forestGreen");
    if (timer[2] == 0) {
      playSound();
      workRunTimer = true;
      timer = [workValue, 0, workValue * 60];
      fixed = workValue * 60;
      currentStrokeLength = 0;
      runTimer();
    }
  }

  currentTime = leadingZero(timer[0]) + ":" + leadingZero(timer[1]);
  number.innerHTML = currentTime;

  timer[2]--;
  timer[0] = Math.floor(timer[2] / 60);
  timer[1] = Math.floor(timer[2] - timer[0] * 60);

  circleTimer.setAttribute(
    "stroke-dasharray",
    currentStrokeLength + "," + circumference
  );

  currentStrokeLength += circumference / fixed;
}

function start() {
  // console.log("start");
  interval = setInterval(runTimer, 1000);
}

function stop() {
  // console.log(interval);
  clearInterval(interval);
}

function reset() {
  number.innerHTML = "25:00";
  clearInterval(interval);
  interval = null;

  timer = [workValue, 0, workValue * 60];
  currentStrokeLength = 0;
  circleTimer.setAttribute("stroke-dasharray", "0, 503");
  START.addEventListener("click", start);
}

/* set up decrement and increment buttons ----------------------*/
function decrement(obj) {
  // console.log(obj.className);
  if (obj.className == "work-decrement") {
    workValue--;
    workText.innerHTML = workValue;
    timer = [workValue, 0, workValue * 60];
    currentTime = leadingZero(timer[0]) + ":" + leadingZero(timer[1]);
    number.innerHTML = currentTime;
  }
  if (obj.className == "break-decrement") {
    breakValue--;
    breakText.innerHTML = breakValue;
  }
}

function increment(obj) {
  // console.log(obj.className);
  if (obj.className == "work-increment") {
    workValue++;
    workText.innerHTML = workValue;
    timer = [workValue, 0, workValue * 60];
    currentTime = leadingZero(timer[0]) + ":" + leadingZero(timer[1]);
    number.innerHTML = currentTime;
  }
  if (obj.className == "break-increment") {
    breakValue++;
    breakText.innerHTML = breakValue;
  }
}

START.addEventListener("click", start);
STOP.addEventListener("click", stop);
RESET.addEventListener("click", reset);