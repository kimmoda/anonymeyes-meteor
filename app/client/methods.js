Meteor.methods({
	'addMarker': function(video){
		console.log(video);

		var marker = new google.maps.Marker({
			position: new google.maps.LatLng(video.latitude, video.longitude),
			map: map
		});

		marker.setMap(map);
	}
});