Meteor.methods({
	'newRecording': function(filename){
		var filenameArr = filename.split(',');

		var timestamp = filenameArr[0];
		var latitude = filenameArr[1];
		var longitude = filenameArr[2].split('.mp4')[0];

		var data = {
			filename: filename,
			timestamp: timestamp,
			latitude: latitude,
			longitude: longitude,
			createdAt: new Date(),
			uploaded: false
		};

		Videos.insert(data);
	},

	'newUpload': function(filename){
		var query = {
			filename: filename
		};

		var data = {
			uploaded: true
		};

		Videos.update(query, {$set: data});
	}
});