Router.configure({
	layoutTemplate: 'applicationLayout'
});

Router.route('/', function(){
	this.render('home');
	this.render('homeHeader', {to: 'header'});
}, {
	name: 'home'
});


Router.route('/new_recording', {where: 'server'})
.post(function(){
	var params = this.params;
	var filename = params.filename;

	Meteor.call('newRecording', filename);
});

Router.route('/new_video', {where: 'server'})
.post(function(){
	var params = this.params;

	var filename = params.filename;

	Meteor.call('newUpload', filename);
});