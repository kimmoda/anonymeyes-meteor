Router.configure({
	layoutTemplate: 'applicationLayout'
});

Router.route('/', function(){
	this.render('home');
	this.render('homeHeader', {to: 'header'});
}, {
	name: 'home',
	onBeforeAction: function(){
		console.log('beforeAction');

		function geoSuccess(position) {
			var location = {
				latitude: position.coords.latitude,
				longitude: position.coords.longitude
			};

			Session.set('location', location);
			console.log('geoSuccess');
		};

		function geoError() {
			var location = {
				latitude: 43.47284,
				longitude: -80.54027
			};

			Session.set('location', location);
			console.log('geoError');

		};

		var geoOptions = {
			enableHighAccuracy: false,
			maximumAge: 30000,
			timeout: 27000
		};

		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(geoSuccess, geoError, geoOptions);
		} else {
			geoError();
		}

		this.next();
	}
});


Router.route('/new_recording', {where: 'server'})
.post(function(){

	var body = this.request.body;

	var filename = body.filename;

	console.log('New recording for: ' + filename);

	Meteor.call('newRecording', filename, function(error, results){
		if (error){
			throw new Meteor.Error("new-recording-failed", "New recording could not be stored.");
		}
		else{
			var videoId = results;
			console.log('Returned video id: ' + videoId);
		}
	});
});

Router.route('/new_video', {where: 'server'})
.post(function(){
	var body = this.request.body;

	var filename = body.filename;

	console.log('New video uploaded for: ' + filename);

	Meteor.call('newUpload', filename, function(error, results){
		if (error){
			throw new Meteor.Error("new-video-upload-failed", "New video could not be uploaded.");
		}
		else{
			var videoId = results;
			console.log('Returned video id: ' + videoId);
			// Meteor.call('addMarker', Videos.findOne(videoId));
		}
	});
});