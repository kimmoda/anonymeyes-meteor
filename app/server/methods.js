
// Because of Google's geocode limit per second, retry geocode until it goes through
var count = 0;
var maxLimit = 10;

function tryGeocode(latitude, longitude) {
	if (++count < maxLimit) {
		return doGeocode(latitude, longitude).catch(tryGeocode(latitude, longitude));
	} else {
		throw new Meteor.Error("geocode-limit", "Geocode limit per second reached.");
	}
}

function doGeocode(latitude, longitude){

	var geocoder = new GeoCoder({
		geocoderProvider: "google",
		// TODO: Change to https when we go live
		httpAdapter: "https",
		apiKey: 'AIzaSyDxrnNkbAtXh5Og-U0QWpjRS47ykZ86D74'
	});

	return geocoder.reverse(latitude, longitude);
}



Meteor.methods({
	'newRecording': function(filename){

		check(filename, String);

		var filenameArr = filename.split(',');

		var timestamp = filenameArr[0];
		var latitude = parseFloat(filenameArr[1]);
		var longitude = parseFloat(filenameArr[2].split('.mp4')[0]);

		var geocoder = new GeoCoder({
			geocoderProvider: "google",
			// TODO: Change to https when we go live
			httpAdapter: "https",
			apiKey: 'AIzaSyDxrnNkbAtXh5Og-U0QWpjRS47ykZ86D74'
		});

		var address = geocoder.reverse(latitude, longitude);
		// var address = tryGeocode(latitude, longitude);

		var data = {
			filename: filename,
			timestamp: timestamp,
			latitude: latitude,
			longitude: longitude,
			address: address,
			createdAt: new Date(),
			uploaded: false
		};

		return Videos.insert(data);
	},

	'newUpload': function(filename){

		match(filename, String);

		var query = {
			filename: filename
		};

		var data = {
			uploaded: true
		};

		Videos.update(query, {$set: data});
	}
});