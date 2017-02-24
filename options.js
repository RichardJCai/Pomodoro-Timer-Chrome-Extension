var workDuration;
var breakDuration;

function setWorkDuration(){
  chrome.storage.sync.set({'workMinutes': parseInt(workMinutes.value)}, function() {});
  chrome.storage.sync.set({'workSeconds': parseInt(workSeconds.value)}, function() {});
}

function setBreakDuration(){
  chrome.storage.sync.set({'breakMinutes': parseInt(workMinutes.value)}, function() {});
  chrome.storage.sync.set({'breakSeconds': parseInt(breakSeconds.value)}, function() {});
}

function openTimerPage(){
  window.open('timer.html', '_blank');
}

function load(){
  document.getElementById('start').addEventListener('click',
      openTimerPage);
  document.getElementById("setWorkDuration").addEventListener("click",setWorkDuration);
  document.getElementById("setBreakDuration").addEventListener("click",setBreakDuration);
}

function setFormValues(workM,breakM,workS,breakS){
  document.getElementById("workMinutes").value = workM;
  document.getElementById("workSeconds").value = workS;
  document.getElementById("breakMinutes").value = breakM;
  document.getElementById("breakSeconds").value  = breakS;
}

function getSaveData(callback){
  chrome.storage.sync.get(["workMinutes","breakMinutes","workSeconds","breakSeconds"],function(result) {
    var wM,bM,wS,bS;
    if (typeof result.workMinutes === "undefined"){
      wM = 0;
    }
    else{
      wM = result.workMinutes;
    }
    if (typeof result.breakMinutes === "undefined"){
      bM = 0;
    }
    else{
      bM = result.breakMinutes;
    }
    if (typeof result.workSeconds === "undefined"){
      wS = 0;
    }
    else{
      wS = result.workSeconds;
    }
    if (typeof result.breakSeconds === "undefined"){
      bS = 0;
    }
    else{
      bS = result.breakSeconds;
    }
    callback(wM,bM,wS,bS);
  });
}

document.getElementById("workMinutes").value = "loading...";
document.getElementById("workSeconds").value = "loading...";
document.getElementById("breakMinutes").value = "loading...";
document.getElementById("breakSeconds").value = "loading...";

getSaveData(setFormValues);
load();
