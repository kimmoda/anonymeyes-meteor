Template.videoItem.helpers({
	'formatTime': function(){
		var timestamp = this.timestamp;
		return moment.unix(timestamp).calendar();
	}
});