Template.videoList.helpers({
	'videos': function() {
		return Videos.find({}, {sort: {timestamp: -1}});
	}
});