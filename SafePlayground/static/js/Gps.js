var geocoder = new kakao.maps.services.Geocoder();
var displayAddress = document.getElementById('address');

function setAddress(address_name, road_name) {
  displayAddress.innerHTML = address_name + ' ' + road_name;
};

function onGeoSuccess(position) {
  const lat = position.coords.latitude;
  const lng = position.coords.longitude;

  var location = new kakao.maps.LatLng(lat, lng),
    message = '<div> 현재 위치 </div>';

  displayMarker(location, message);

  geocoder.coord2Address(lng, lat, function(result, status){
    if (status === kakao.maps.services.Status.OK) {
      setAddress(result[0].address.address_name, result[0].road_address.road_name);
    }
  });
};

function onGeoError() {
  alert("위치 정보를 찾을 수 없습니다.");
};

function displayMarker(location, message){
  var marker = new kakao.maps.Marker({
    map: map,
    position: location
  });

  var icontent = message,
    iremoveable = true;
    
  var infoWindow = new kakao.maps.InfoWindow({
    content: icontent,
    removable: iremoveable
  });

  infoWindow.open(map, marker);
  map.setCenter(location);
};

var mapContainer = document.getElementById('map-display'), 
  mapOption = { 
    center: new kakao.maps.LatLng(33, 126),
    level: 10
  };

var map = new kakao.maps.Map(mapContainer, mapOption);

navigator.geolocation.getCurrentPosition(onGeoSuccess, onGeoError);