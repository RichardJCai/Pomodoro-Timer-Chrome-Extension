// //timer.js
// This needs to take in all the input from the popup,
// then open the timer.html page which will show the countdown, work/break durations, elapsed time


var flag = false;
var workDuration;
var breakDuration;
var test;
var test2;
var startTime;
var clockInterval;
var duration;
var workSession = true; //Starts with a work session
var paused;
var elapsedTime;
var result;

//Mutator method
function setDuration(workMinutes,breakMinutes,workSeconds,breakSeconds){
  workDuration = parseInt(workMinutes)*60 + workSeconds;
  breakDuration = parseInt(breakMinutes)*60 + breakSeconds;
  startTimer();
}

function getDuration(callback){
  chrome.storage.sync.get(["workMinutes","breakMinutes","workSeconds","breakSeconds"],function(result) {
    callback(result.workMinutes,result.breakMinutes,result.workSeconds,result.breakSeconds);
  });
}

function setStartTime(){
  var d = new Date();
  startTime = d.getMinutes() * 60 + d.getSeconds();
}

function sessionSwitch(){
  if (workSession){
    workSession = false;
    duration = breakDuration;
    document.getElementById("status").innerHTML = "Currently in a work session!"
  }
  else{
    workSession = true;
    duration = workDuration;
    document.getElementById("status").innerHTML = "Currently on break!"
  }
  setStartTime();
  update_time();
}

function alarmAlert(){
  var myAudio = new Audio();
  myAudio.src = "alert.wav"
  myAudio.play();
}

//Returns remaining time - duration - elapsed time
function countdown(startTime){
  var curr = new Date();
  elapsedTime = (parseInt(curr.getMinutes())*60 + parseInt(curr.getSeconds()) - parseInt(startTime))

  if (elapsedTime < 0){
    elapsedTime += 3600;
  }
  return parseInt(duration) - elapsedTime; //Duration - Elapsed Time
}

//Displays the time
function update_time(){
  if (!flag){
    setStartTime();
    flag = true;
  }

  if (countdown(startTime) >= 0){
    if (Math.floor((parseInt((countdown(startTime)))%60)/10) == 0){
      document.getElementById('time').innerHTML = Math.floor((countdown(startTime))/60) + ":" + "0" + parseInt((countdown(startTime)))%60;
    }
    else{
      document.getElementById('time').innerHTML = Math.floor((countdown(startTime))/60) + ":" + parseInt((countdown(startTime)))%60;
    }
  }
  else{
    alarmAlert();
    sessionSwitch();
  }
}


function startTimer(){
  duration = workDuration; //Placeholder code
  setStartTime();
  update_time();
  clockInterval = setInterval(update_time,1000);
  paused = false;
}

function stopTimer(){
  clearInterval(clockInterval);
  document.getElementById("time").innerHTML = "0:00"
}

function pauseTimer(){
  if (!paused){
    clearInterval(clockInterval);
    document.getElementById("pause").innerHTML = "Resume";
  }
  else{
    setStartTime();
    duration -= elapsedTime;
    update_time();
    clockInterval = setInterval(update_time,1000);
    document.getElementById("pause").innerHTML = "Pause";
  }
  paused = !paused;

}


document.getElementById("status").innerHTML = "Currently in a work session!";
getDuration(setDuration);
document.getElementById("stop").addEventListener("click",stopTimer);
document.getElementById("pause").addEventListener("click",pauseTimer);
document.getElementById("start").addEventListener("click",startTimer);
