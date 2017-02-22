var flag = false;
var workDuration;
var breakDuration;
var startTime;
var clockInterval;
var duration;
var workSession = true; //Starts with a work session


function setWorkDuration(){
  workDuration = parseInt(workMinutes.value) * 60 + parseInt(workSeconds.value);
  document.getElementById("test").innerHTML = workDuration;
}

function setBreakDuration(){
  breakDuration = parseInt(breakMinutes.value) * 60 + parseInt(breakSeconds.value);
  document.getElementById("break").innerHTML = breakDuration;
}

function setStartTime(){
  var d = new Date();
  startTime = d.getMinutes() * 60 + d.getSeconds();
  document.getElementById('minsec').innerHTML = d.getMinutes()*60 + " " + d.getSeconds(); //Current Time
}

function sessionSwitch(){
  if (workSession){
    workSession = false;
    duration = breakDuration;
  }
  else{
    workSession = true;
    duration = workDuration;
  }
  setStartTime();
  update_time();
}

//Placeholder function for alarm
function alarmAlert(){
  var myAudio = new Audio();
  myAudio.src = "alert.wav"
  myAudio.play();
}

//Returns remaining time - duration - elapsed time
function countdown(startTime){
  var curr = new Date();
  document.getElementById('minsec2').innerHTML = curr.getMinutes()*60 + " " + curr.getSeconds(); //Current Time
  return parseInt(duration) - (parseInt(curr.getMinutes())*60 + parseInt(curr.getSeconds()) - parseInt(startTime)); //Duration - Elapsed Time
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

function func_start(){
  duration = workDuration; //Placeholder code
  clockInterval = setInterval(update_time,1000);
}


document.getElementById('start').addEventListener('click',
    func_start);
document.getElementById("setWorkDuration").addEventListener("click",setWorkDuration);
document.getElementById("setBreakDuration").addEventListener("click",setBreakDuration);
