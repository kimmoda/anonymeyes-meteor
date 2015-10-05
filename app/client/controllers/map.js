
function initMapLocation(){
	if (typeof Session.get('location') !== "undefined"){
		var location = Session.get('location');	
		map.setCenter(new google.maps.LatLng(location.latitude, location.longitude));

		Session.set('map', true);

	}
	else{
		setTimeout(initMapLocation, 50);
	}
};


Template.map.rendered = function(){
	var mapOptions = {
		zoom: 16
	};

	map = new google.maps.Map(document.getElementById("google-maps"),
		mapOptions);
	
	initMapLocation();

	var videos = Videos.find().fetch();


	Deps.autorun(function() {

		var isMap = Session.get('map');
		if(isMap) {
			var videos = Videos.find().fetch();
			videos.forEach(function (video) {
				var marker = new google.maps.Marker({
					position: new google.maps.LatLng(video.latitude, video.longitude),
					map: map
				});	

				// Click listener for markers
				google.maps.event.addListener(marker, 'click', function(){
					Session.set('currentVideo', video);
					$('.selected-video-source').attr('src', '/videos/' + video.filename);
					$('.selected-video-frame').load();
					$('.video-modal').openModal();
				});

				marker.setMap(map);
			});    
		}
	});
};

Template.map.destroyed = function(){
	Session.set('map', false);
}
