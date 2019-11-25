var keys = require("keys.js");

var Twitter = require("twitter");

var request = require("request");

var Spotify = require("node-spotify-api");

var command = process.argv[2];

var fs = require("fs");

if (command == "my-tweets") {

	var client = new Twitter(keys);

	var params = {screen_name: "judecarpenter"};

	client.get("statuses/user_timeline", params, function(err,tweets,response){
		if (!err) {
			for (var i = 0; i < tweets.length; i++) {
				console.log("");
				console.log(tweets[i].text);
				console.log(tweets[i].created_at);
			}
		}
		else {
			console.log(err);
		}
	})
}

if (command == "spotify-this-song") {
	spotify();
}

function spotify (song) {

	var songName = "Hey Jude";

	var sliced = process.argv.slice(3, process.argv.length).join(" ");

	if (sliced){
		songName = sliced;
	}
	else  if (command == "do-what-it-says") {
		songName = song;
	}

	var spotify = new Spotify ({
		id: "6ff6fe25e03344d4b9f91c15f4b9fbb9",
		secret: "58e6e17748d54a4fa7a9082c8951e64a"
	})

	spotify.search({ type: "track", query: songName }, function(err, data){
		if (err) {
			console.log(err);
		}
		console.log("");
		console.log("Artist: " + data.tracks.items[0].artists[0].name);
		console.log("Song Name: " + data.tracks.items[0].name);
		console.log("Preview Link: " + data.tracks.items[0].external_urls.spotify);
		console.log("Album: " + data.tracks.items[0].album.name);
	})
}


if (command == "movie-this") {

	var sliced = process.argv.slice(3, process.argv.length).join(" ");
	
	if (sliced) {
		movieName = sliced;
	}
	else {
		movieName = "The Matrix";
	}

	request("http://www.omdbapi.com/?apikey=40e9cece&t=" + movieName, function(err, response, body){
		if (err) {
			console.log(err);
		}
		var movieArray = JSON.parse(body);
		console.log("");
		console.log("Movie Title: " + movieArray.Title);
		console.log("Year Released: " + movieArray.Year);
		console.log("IMDB Rating: " + movieArray.Ratings[0].Value);
		console.log("Rotten Tomatoes Rating: " + movieArray.Ratings[1].Value);
		console.log("Country Produced: " + movieArray.Country);
		console.log("Language(s): " + movieArray.Language);
		console.log("Plot: " + movieArray.Plot);
		console.log("Actors: " + movieArray.Actors);
	})
}

if (command == "do-what-it-says") {
	fs.readFile("./random.txt", "utf8",  function(err, data){
		if (err) {
			console.log(err);
		}
		var fileArray = data.split(",");
		spotify(fileArray[1]);
	})
}