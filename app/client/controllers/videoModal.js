Template.videoModal.helpers({
	'videoExists': function(){
		var currentVideo = Session.get('currentVideo');

		if (currentVideo)
			return currentVideo.uploaded;
		else
			throw new Meteor.Error("current-video-dne", "No videos are currently selected.");

	},

	'getVideoFilename': function(){
		var currentVideo = Session.get('currentVideo');

		if (currentVideo)
			return currentVideo.filename;
		else
			throw new Meteor.Error("current-video-dne", "No videos are currently selected.");
	},

	'getVideoAddress': function(){
		var currentVideo = Session.get('currentVideo');

		if (currentVideo){
			var address = currentVideo.address[0];
			return address.streetName + "\n" + address.city + (address.stateCode ? ', ' + address.stateCode : '') + ", " + address.country;
		}
		else
			throw new Meteor.Error("current-video-dne", "No videos are currently selected.");
	}
});