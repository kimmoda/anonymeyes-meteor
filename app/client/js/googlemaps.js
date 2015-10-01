$(function(){
	var map, currentLatitude, currentLongitude;

	function geoSuccess(position) {
		currentLatitude = position.coords.latitude;
		currentLongitude = position.coords.longitude;
	}

	function geoError() {
		currentLatitude = 43.47284;
		currentLongitude = -80.54027;
	}

	var geoOptions = {
		enableHighAccuracy: false,
		maximumAge: 30000,
		timeout: 27000
	};

	function initMap(){

		map = new google.maps.Map(document.getElementById("google-maps"), {
			zoom: 16,
			center: new google.maps.LatLng(currentLatitude, currentLongitude)
		});

		var videos = Videos.find().fetch();

		console.log(videos);

		for (i in videos){
			addMarker(videos[i]);
		}
	};

	function addMarker(video){

		var marker = new google.maps.Marker({
			position: new google.maps.LatLng(video.latitude, video.longitude),
			map: map
		});

		marker.setMap(map);
	};

	// Initialize geo-coordinates (and then map)
	if ("geolocation" in navigator) {
		navigator.geolocation.getCurrentPosition(geoSuccess, geoError, geoOptions);
	} else {
		geoError();
	}

	google.maps.event.addDomListener(window, "load", initMap);
});