//test to try eventpages
//Issue is this JS isnt running in the background, need code to run in BG
var hold = 100;
function myFunction() {
  document.getElementById("time12").innerHTML = hold;
  hold--;
}

document.getElementById("test1").addEventListener("click",myFunction);
