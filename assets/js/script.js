var apis = [];


// get from local storage add to our array if data
var  apiArr = JSON.parse(localStorage.getItem("MyApi"));
if (apiArr !== null) {
    apis = apiArr;
}



// adding a api
$(document).on("click", ".nav-link", function(){
    event.preventDefault();

    var apiSelected = $(this).attr("data-name");
    alert(apiSelected);

    if (apis.indexOf(apiSelected) === -1) {    
        apis.unshift(apiSelected);
    }
    alert(apis);


    localStorage.setItem("MyApi", JSON.stringify(apis));

    // $("#NYT-results").empty();

    location.reload();
});


// clear all
$(document).on("click", ".nav-clear", function(){
    // event.preventDefault();
    var apiSelected = $(this).attr("data-name");
    $("#NY-Times").empty();
    localStorage.removeItem("MyApi");
    location.reload();
});



if (apis.indexOf("NYTimes") >= 0 ) {    

    $("h5").hide();

      var URL = "https://api.nytimes.com/svc/mostpopular/v2/viewed/1.json?api-key=4qNVqjAdi03nzHw7azhmHTk15fzEQEo7";
      $.ajax({
        url: URL,
        method: "GET"
        }).then(function(resp){
        console.log(resp)

         var limit = 5;    

         var newRow = $("<h4>NY Times Most Visited Articles...</h4>");
          $("#NYT-results").append(newRow);    

        for(var i=0; i < limit; i++){

          var title  = resp.results[i].title;
          var byline = resp.results[i].byline;
          var url    = resp.results[i].url;

          // alert(title + " " + byline + " " + url);

          var newRow2 = $("<div class='smalltype'>&#8226; " + title + "</div>");
          newRow.append(newRow2); 

          var newRow3 = $("<div class='smalltype smalltype-pad'>" + byline + " &nbsp; <a href='"+url+"' target ='_blank'>Link</a></div>");
          newRow2.append(newRow3); 


        }     
      });
}



if (apis.indexOf("Holiday") >= 0) {  

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
  $("#Holiday-results").append(newRow);    



  for(var i=0; i < 10; i++){

  var dt  = resp[i].date;
  var name = resp[i].localName;
  var newRow2 = $("<div class='smalltype'>&#8226; " + dt + "</div>");
  newRow.append(newRow2); 

  var newRow3 = $("<div class='smalltype smalltype-pad'>" + name + "</div>");
  newRow2.append(newRow3); 
}     

});

}



if (apis.indexOf("NASA") >= 0) {  

var settings = {
	"async": true,
	"crossDomain": true,
	"url": "https://nasaapidimasv1.p.rapidapi.com/getPictureOfTheDay",
	"method": "POST",
	"headers": {
		"x-rapidapi-host": "NasaAPIdimasV1.p.rapidapi.com",
		"x-rapidapi-key": "001df8cadcmsha73da3732d7cba9p10579bjsn40db637f4980",
		"content-type": "application/x-www-form-urlencoded"
	},
	"data": {}
}

$.ajax(settings).done(function (resp) {
	console.log(resp);

  var newRow = $("<h4>NASA Image of the Day...</h4>");
  $("#NASA-results").append(newRow);  

//var img = resp.contexWrites.to.copyright;

//console.log(resp.contexWrites.to.url);

  //var newRow2 = $("<div class='smalltype smalltype-pad'><img scr='"+img+"'></div>");
 // newRow.append(newRow2); 


});

}