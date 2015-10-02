Template.map.rendered = function(){
	var mapOptions = {
		zoom: 16
	};

	map = new google.maps.Map(document.getElementById("google-maps"),
		mapOptions); 

	var location = Session.get('location');

	map.setCenter(new google.maps.LatLng(location.latitude, location.longitude));

	var videos = Videos.find().fetch();

	for (i in videos)
		Meteor.call('addMarker', videos[i]);
};