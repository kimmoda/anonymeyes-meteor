Router.configure({
	layoutTemplate: 'applicationLayout'
});

Router.route('/', function(){
	this.render('homeHeader', {to: 'header'});
});


Router.route('/new_recording', {where: 'server'})
.post(function(){

});

Router.route('/new_video', {where: 'server'})
.post(function(){
	var params = this.params;

	var fileName = params.filename;


});