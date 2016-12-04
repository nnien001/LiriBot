

function runSwitch(arg1, arg2) {
	switch(arg1) {
		case "my-tweets":
			twitter();
			break;
		case "spotify-this-song":
			if (arg2 == "")
				spotify("The Sign");
			else
				spotify(arg2);
			break;
		case "movie-this":
			if (arg2 == "")
				movieThis("Mr. Nobody");
			else
				movieThis(arg2);
			break;
		case "do-what-it-says":
			doWhatItSays();
			break;
		default:
			console.log("commands: my-tweets, spotify-this-song <songname>, movie-this <moviename>, do-what-it-says")

	}
}

function twitter() {
	var keys = require("./keys.js");

	var Twitter = require('twitter');
 
	var client = new Twitter({
  		consumer_key: keys.twitterKeys.consumer_key,
  		consumer_secret: keys.twitterKeys.consumer_secret,
  		access_token_key: keys.twitterKeys.access_token_key,
  		access_token_secret: keys.twitterKeys.access_token_secret
	});
 
	var params = {screen_name: 'nnien001'};
	client.get('statuses/user_timeline', params, function(error, tweets, response) {
  		if (error) {
  			return console.log(error);

  		}
		else {
			var i = 0;

  			while (i < tweets.length && i < 20) {
  				console.log(tweets[i].created_at, tweets[i].text);
  				i++;
  			}

		}

	});

}


function spotify(argSong) {
	var spotify = require('spotify');
 
	spotify.search({ type: 'track', query: argSong, limit: 1 }, function(err, data) {
	    if ( err ) {
	        return console.log(err);
	    }

	    else {
	    	//got lazy here. Just pulled the first record from spotify
	    	console.log("artists:", JSON.stringify(data.tracks.items[0].artists[0].name, null, 2) );
	    	console.log("song:", JSON.stringify(data.tracks.items[0].name, null, 2) );
	    	//console.log(JSON.stringify(data.tracks.items[0].type, null, 2) );
	    	console.log("preview:", JSON.stringify(data.tracks.items[0].preview_url, null, 2) );
	    	console.log("album:", JSON.stringify(data.tracks.items[0].album.name, null, 2) );
	    	//console.log(JSON.stringify(data.tracks.items[0].popularity, null, 2) );
	    }
 
    });
}

function movieThis(movieName) {
/*	* Title of the movie.
    * Year the movie came out.
    * IMDB Rating of the movie.
    * Country where the movie was produced.
    * Language of the movie.
    * Plot of the movie.
    * Actors in the movie.
    * Rotten Tomatoes Rating.
    * Rotten Tomatoes URL.
*/
	var request = require("request");
	request("http://www.omdbapi.com/?t="+movieName+"&y=&tomatoes=true&plot=short&r=json", function(error, response, body) {

		if (!error && response.statusCode === 200) {

    		console.log("Title:", JSON.parse(body).Title);
    		console.log("Year:", JSON.parse(body).Year);
    		console.log("imdbRating:", JSON.parse(body).imdbRating);
    		console.log("Country:", JSON.parse(body).Country);
    		console.log("Language:", JSON.parse(body).Language);
    		console.log("Plot:", JSON.parse(body).Plot);
    		console.log("Actors:", JSON.parse(body).Actors);
    		console.log("TomatoMeter:", JSON.parse(body).tomatoMeter);
    		console.log("TomatoURL:", JSON.parse(body).tomatoURL);
  		}
  		else 
  			return console.log(error);
});




}

function doWhatItSays() {
	var fs = require("fs");

	fs.readFile("random.txt", "utf8", function(error, data) {
		if (error) {
	        return console.log(error);
	    }

	    else {
			var myArray = data.split(",");
			
			runSwitch(myArray[0], myArray[1]);
		}
	});

}

//the actual main() that runs:
var cmdArg1 = process.argv[2];
var cmdArg2 = process.argv.slice(3, process.argv.length).join(' ').trim();

runSwitch(cmdArg1, cmdArg2);