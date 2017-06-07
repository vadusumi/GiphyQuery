

//The array that will populate buttons in the header
var topics = ["cat", "dog", "parrot", "bird", "ferret", "mouse", "hedgehog", "fox", "bear", "tiger", "lion"];

var i = 0;

//API query variables

var queryURL = "http://api.giphy.com/v1/gifs/search?api_key=dc6zaTOxFJmzC&limit=10&fmt=json&q="


//Makes buttons out of 'topics' string values
function buttonmaker(){
	for (i = 0; i < topics.length; i++) {
		var buttonholder = $("<button>" + topics[i] + "</button>");
		buttonholder.attr("value", topics[i]);
		buttonholder.attr("class", "btn btn-primary btn-lg");
		$("#buttonland").append(buttonholder);
	};
};

//On click, a button queries the API
$(document).on("click", ".btn-primary", function(){

	//Redefines queryURL to base structure so that search terms don't endlessly append with repeated searches
	queryURL = "http://api.giphy.com/v1/gifs/search?api_key=dc6zaTOxFJmzC&limit=10&fmt=json&q="
	queryURL = queryURL + $(this).val();
	
	console.log(queryURL);
	$.ajax({
        url: queryURL,
        method: "GET"
      }).done(function(response){

      //A for loop that populates the table with images and sets data attributes.
      	//I considered using .children and .eq to get table elements, but
      	//then there would have been two numbers in play - eq(x) and data(y),
      	//which would have made a for loop unusable and meant a nightmarish amount of repetitive code. 
        for (var j = 0; j < 9; j++) {
      		$("#td" + j).html("<img src=\'" + response.data[j].images.fixed_height_still.url + 
      		"\' data-still=\'" + response.data[j].images.fixed_height_still.url + 
      		"\' data-animate=\'" + response.data[j].images.fixed_height.url + 
      		"\' data-state=\'still\' class=\'gif centered\'>");

      		$("#td" + j).append("<p class=\'text-center\'>Rating: " + response.data[j].rating + "</p>");
      	}

      	
      });
});


//Animation control
$(document).on("click", ".gif", function(){

  var state = $(this).attr("data-state");

  if (state === "still") {
    $(this).attr("src", $(this).attr("data-animate"));
    $(this).attr("data-state", "animate");
  } 
  else {
    $(this).attr("src", $(this).attr("data-still"));
    $(this).attr("data-state", "still");
  }
});

buttonmaker();