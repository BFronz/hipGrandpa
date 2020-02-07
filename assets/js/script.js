$(".button-collapse").dropdown();

// selectors 
var startEl =  document.getElementById("start-info");
var howtoEL =  document.getElementById("howto-results");
var wineformEL = document.getElementById("wineform");
var wineEl  =   document.getElementById("wine-results"); 



// vars
var searchQ = "";
var excludeIngredients = "";
var intolerance = "";
var typeOfWine = "";
var wordQuery = "";
var apis =[];



// hide some elements on if they havent selected anything
//  howtoEL.style.visibility = 'hidden';
 howtoEL.style.display = 'none';

// document.getElementById("wine-results").style.display = "none";
// wineEl.style.visibility  = 'hidden';
wineEl.style.display  = 'none';



// get from local storage add to our array if data
var  apiArr = JSON.parse(localStorage.getItem("MyApi"))
if (apiArr !== null) {
    apis = apiArr;
    document.getElementById("start-info").style.display = "none";
}



// adding selected to array
$(document).on("click", ".b-click", function(){
    event.preventDefault();

    // this item will stops stacking of all apis on the page, remove it to change
    localStorage.removeItem("MyApi"); 

    var apiSelected = $(this).attr("data-name");
    var apis = [];
    
    if (apis.indexOf(apiSelected) === -1) {    
        
        apis.unshift(apiSelected);
     
    }
    
    if(apis != null) {
           
        localStorage.setItem("MyApi", JSON.stringify(apis));      
    }   

    location.reload();
});


// clear all  button
$(document).on("click", ".btn-clear", function(){
    event.preventDefault();
    var x = $(this).attr("data-name");
     //alert(x);

     $("NYTimes-result #Holiday-result #NASA-results #Music-results ").empty(); 
   
    
    localStorage.removeItem("MyApi");
    location.reload();
});


// NY Times API
if (apis.indexOf("nytimes") >= 0 ) {    
     
    $("h5").hide();

      var URL = "https://api.nytimes.com/svc/mostpopular/v2/viewed/1.json?api-key=4qNVqjAdi03nzHw7azhmHTk15fzEQEo7";
      $.ajax({
        url: URL,
        method: "GET"
        }).then(function(resp){
        console.log(resp)

         var limit = 5;    

         var newRow = $("<h4>NY Times Most Visited Articles...</h4>");
          $("#nyt-results").append(newRow);    
      
        for(var i=0; i < limit; i++){

          var title  = resp.results[i].title;
          var byline = resp.results[i].byline;
          if(byline===""){byline="NY Time Co";}
          var url    = resp.results[i].url;

          // alert(title + " " + byline + " " + url);

          var newRow2 = $("<div class='smalltype'>&#8226; " + title + "</div>");
          newRow.append(newRow2); 

          var newRow3 = $("<div class='smalltype smalltype-pad'>" + byline + " &nbsp; <a href='"+url+"' target ='_blank'>Link</a></div>");
          newRow2.append(newRow3); 
    
  
        }     
      });
}


// Holiday API
if (apis.indexOf("holiday") >= 0) {  

var settings = {
	"async": true,
	"crossDomain": true,
	"url": "https://public-holiday.p.rapidapi.com/2020/US",
	"method": "GET",
	"headers": {
		"x-rapidapi-host": "public-holiday.p.rapidapi.com",
		"x-rapidapi-key": "001df8cadcmsha73da3732d7cba9p10579bjsn40db637f4980"
	}
}
$.ajax(settings).done(function (resp) {

	console.log(resp);

  var newRow = $("<h4>Important Holidays...</h4>");
  $("#holiday-results").append(newRow);    
  for(var i=0; i < 10; i++){

  var dt  = resp[i].date;
  var name = resp[i].localName;
  var newRow2 = $("<div class='smalltype'>&#8226; " + dt + " &nbsp;&nbsp; "+name+"</div>");
  newRow.append(newRow2); 
}     

});

}



// Music list API
if (apis.indexOf("music") >= 0) {  

var settings = {
	"async": true,
	"crossDomain": true,
	"url": "https://30-000-radio-stations-and-music-charts.p.rapidapi.com/rapidapi?charts24h=1",
	"method": "GET",
	"headers": {
		"x-rapidapi-host": "30-000-radio-stations-and-music-charts.p.rapidapi.com",
		"x-rapidapi-key": "001df8cadcmsha73da3732d7cba9p10579bjsn40db637f4980"
	}
}

$.ajax(settings).done(function (resp) {
    console.log(resp);
    
var newRow = $("<h4>Top 10 Songs for today...</h4>");
$("#music-results").append(newRow);  

for(var i=0; i < 10; i++){

var z = i + 1;
var  artist  = resp.results[i].artist_song;
var song = resp.results[i].title_song;


var songEncode =  song.replace(" ", "+");
var url =  "http://www.youtube.com/results?search_query="+ songEncode +"&oq="+ songEncode +"";



var newRow2 = $("<div class='smalltype'>"+ z +". " + song + " &nbsp; &nbsp; <a class='am' href='"+url+"' target ='_blank'>Listen Now</a></div>");
newRow.append(newRow2); 

var newRow3 = $("<div class='smalltype smalltype-pad'>Artist: " + artist + "</div>");
newRow2.append(newRow3); 
}     

});

}



// Joke of the Day API
if (apis.indexOf("jokes") >= 0) {  

var settings = {
	"async": true,
	"crossDomain": true,
	"url": "https://jokeapi.p.rapidapi.com/category/programming?format=json",
	"method": "GET",
	"headers": {
		"x-rapidapi-host": "jokeapi.p.rapidapi.com",
		"x-rapidapi-key": "001df8cadcmsha73da3732d7cba9p10579bjsn40db637f4980"
	}
}

$.ajax(settings).done(function (resp) {
	console.log(resp);

var newRow = $("<h4>Hip Joke of the day...</h4>");
$("#grandpa-jokes").append(newRow);  

var setUp    = resp.setup;
var delivery = resp.delivery;

var newRow2 = $("<div class='smalltype'>"+ setUp +"</div>");
newRow.append(newRow2); 
var
 newRow3 = $("<div class='smalltype'>"+ delivery +"</div>");
newRow2.append(newRow3); 

});

}


// HowTo code
if (apis.indexOf("howto") >= 0) { 
//  howtoEL.style.visibility = 'visible';
 howtoEL.style.display = 'inline';
 

var vidArray = ['0', '1', '2', '3', '4', '5', '6'];

function mixIt (array) {

	var currentIndex = array.length;
	var temporaryValue, randomIndex;

	// While there remain elements to shuffle...
	while (0 !== currentIndex) {
		// Pick a remaining element...
		randomIndex = Math.floor(Math.random() * currentIndex);
		currentIndex -= 1;

		// And swap it with the current element.
		temporaryValue = array[currentIndex];
		array[currentIndex] = array[randomIndex];
		array[randomIndex] = temporaryValue;
	}

	return array;

};

var howToVids = [
"https://www.youtube.com/embed/eVqaCpHLQ1k",
"https://www.youtube.com/embed/apoVa0gwER8",
"https://www.youtube.com/embed/ChnjKdMdQqA",
"https://www.youtube.com/embed/6HIr_IpSBEQ",
"https://www.youtube.com/embed/fGcHOcj1SQA",
"https://www.youtube.com/embed/_94zZDXXj8c",
"https://www.youtube.com/embed/GC6n4Rk4yGY",
"https://www.youtube.com/embed/5jWNpLvdocU"
]


var newVidArray = mixIt (vidArray);
// alert(newVidArray);
var z = 1;
for(var i=0; i<4; i++){

    var theID = "#frame" + z; 
    
    $(theID).attr("src", howToVids[newVidArray[i]]);
    z++;
 }

}



/// Wine API
if (apis.indexOf("wine") >= 0) { 

    // wineEl.style.visibility  = 'visible';
    wineEl.style.display = 'inline';

    $(document).on('click', '.wineBtn', function(){
        event.preventDefault();
    
        var typeOfWine = document.getElementById("wine_input").value;
        
        //var typeOfWine = "merlot"; 
       
        var spoonKey = "697707a6d9bd436a84a81ca2ca3fd98a"; 
  
        queryURL = `https://api.spoonacular.com/food/wine/recommendation?wine=${typeOfWine}&number=3&apiKey=${spoonKey}`;
            $.ajax({
                url: queryURL,
                method: "GET"
                 }).then(function (response) {
                 console.log(response);
                var arrayWine = response.recommendedWines;
               // alert(arrayWine[0].imageUrl);
 
                $("#wine1").attr("src", arrayWine[0].imageUrl);
                $("#wine2").attr("src", arrayWine[1].imageUrl);
                $("#wine3").attr("src", arrayWine[2].imageUrl);
 
                $("#img1").attr("href", arrayWine[0].link);
                $("#img2").attr("href", arrayWine[1].link);
                $("#img3").attr("href", arrayWine[2].link);
            });

    });
}
