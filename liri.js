switch(process.argv[2]) {
	case "my-tweets":
		twitter();
		break;
	case "spotify-this-song":
		var song;
		song = "The Sign";
		spotify(song);
		break;
	case "movie-this":
		break;
	case "do-what-it-says":
		break;
	default:
		console.log("commands: my-tweets, spotify-this-song <songname>, movie-this , do-what-it-says")
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

	    	console.log(JSON.stringify(data.tracks.items[5].artists[0].name, null, 2) );
	    	console.log(JSON.stringify(data.tracks.items[5].name, null, 2) );
	    	console.log(JSON.stringify(data.tracks.items[5].type, null, 2) );
	    	console.log(JSON.stringify(data.tracks.items[5].preview_url, null, 2) );
	    	console.log(JSON.stringify(data.tracks.items[5].album.name, null, 2) );
	    	console.log(JSON.stringify(data.tracks.items[5].popularity, null, 2) );
	    }
 
    });
}