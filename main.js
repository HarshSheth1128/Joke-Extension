// TODO //
// Account for overflow if more than 100
// SOLN: Go to next page

var joke_count;
var d;
var address = "https://www.reddit.com/r/jokes/top.json?limit=100&sort=top&t=day";
var date = new Date();
day = date.getDate();
var cookie_array;

//Check if there exists a cookie, if so get it and if not set to 0
if(document.cookie != null){
  cookie_array = document.cookie.split(";");
} else {
  cookie_array[0] = 0;
  cookie_array[1] = day;
}

//Hide previous Button
if(document.cookie == 0){
    document.getElementById("PrevBtn").style.display = "none";
}

//If the date is the next day from when you last accessed, set the index to zero
if(date.getDate() > cookie_array[1] ||
   (date.getDate() < cookie_array[1] &&
   (cookie_array[1] == 31 || cookie_array[1] == 30 || cookie_array[1] == 28))){
    cookie_array[0] = 0;
}

//Function that is run when JSON call is done
$(document).ready(function(){
  $.getJSON(address, function(data){
    d = data;
    getData(data);
  });
});

//Load Data
function getData(data){
  //If first joke disable the button
  if(cookie_array[0] != 0){
    document.getElementById("PrevBtn").style.display = "block";
  } else {
    document.getElementById("PrevBtn").style.display = "none";
  }

  //If last joke disable the button
  if(cookie_array[0] == data.data.children.length - 1){
    document.getElementById("NxtBtn").style.display = "none";
  } else {
    document.getElementById("NxtBtn").style.display = "block";
  }

  document.getElementById("jokeline").innerHTML = data.data.children[cookie_array[0]].data.title;
  document.getElementById("punchline").innerHTML = data.data.children[cookie_array[0]].data.selftext;
  document.cookie = cookie_array.join(";");
  console.log(document.cookie);
}

// Process Button Clicks

// Next
$("#NxtBtn").click(function(){
  cookie_array[0]++;
  getData(d);
});

// Previous
$("#PrevBtn").click(function(){
  cookie_array[0]--;
  getData(d);
});

// Reset
$("#ResetBtn").click(function(){
  cookie_array[0] = 0;
  getData(d);
});

//Process keypress
document.onkeydown = function(e){
  console.log("pressed");
  var code = e.keyCode || e.which;
  //Right Arrow
  if(code == 39 && cookie_array[0] < d.data.children.length - 1){
    cookie_array[0]++;
    getData(d);
  //Left Arrow
  } else if (code == 37 && cookie_array[0] > 0) {
    cookie_array[0]--;
    getData(d);
  }
};
