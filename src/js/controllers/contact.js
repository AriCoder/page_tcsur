/*
* Implements Google maps
* @Author: ABC
* 
*/

(function(){
  //se inicializa mapa
var initMap=function(){
  //utilizado para agregar las indicaciones
  var directionsDisplay = new google.maps.DirectionsRenderer;
  //servicio para indicaciones
  var directionsService = new google.maps.DirectionsService;

  //coordenadas de la terminal
  var tcsur = {lat: 19.342473, lng: -99.138634};
  //creacion del mapa
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 17,
    center: tcsur
  });

  //texto informativo
  var contentString = 'Terminal Central del Sur';
  var infotcsur = new google.maps.InfoWindow({
    content: contentString
  });
  //se agrega marker
  var marker = new google.maps.Marker({
    position: tcsur,
    map: map,
    icon: 'https://raw.githubusercontent.com/CodyHouse/custom-google-map/master/img/cd-icon-location.png'
  });
  //se abre texto informativo
  infotcsur.open(map, marker);
  //se inta el mapa inicial
  directionsDisplay.setMap(map);
  //se inicializa evento por forma de llegar
  document.getElementById('mode').addEventListener('change', function() {
    //se valida si se carga el mapa inicial
    if(document.getElementById('mode').value=='SELECT'){
      initMap();
    }else{
      //o se calcula la ruta
      calculateAndDisplayRoute(directionsService, directionsDisplay);
    }    
  });
  // se inicializa texto para indicarle al usuario donde se encuentra
  var infoWindow = new google.maps.InfoWindow({map: map});
  // se calcula la ruta en base a la geolocalizacion del usuario
  function calculateAndDisplayRoute(directionsService, directionsDisplay) {
    //se carga el modo de ruta
    var selectedMode = document.getElementById('mode').value;
    // se valida si encontramos ubicacion desde el navegador
      if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(function(position) {
            // Se guarda la ubicacion del usuario 
            pos = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                  };    
            //se realiza la peticion para trazar la ruta         
            directionsService.route({
              origin: {lat: pos.lat, lng: pos.lng},   //origen
              destination: {lat:tcsur.lat, lng:tcsur.lng},  //destino
              travelMode: google.maps.TravelMode[selectedMode] //modo de viaje
            }, function(response, status) {
              if (status == 'OK') { //si el servicio nos regresa la ruta, se pinta la respuesta en el mapa
                directionsDisplay.setDirections(response);
              } else {
                //sino mandamos un mensaje de error
                window.alert('Peticion de indicaciones fallida, debido a: ' + status);
              }
            });
            // se pinta el texto con la ubicacion del usuario o le decimos a donde està
            infoWindow.setPosition(pos);
            infoWindow.setContent('Usted está aquí');
            map.setCenter(pos);
          }, function() {
            //si ocurre algun erro de manda un mensaje
                handleLocationError(true, infoWindow, map.getCenter());
              });
        } else {
          //sino mandamos mensaje de error
              handleLocationError(false, infoWindow, map.getCenter());
        }

    }
}

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
  infoWindow.setPosition(pos);
  infoWindow.setContent(browserHasGeolocation ?
  'Error: El servicio de Geolocalizacion ha sido fallida.' :
  'Error: Su navegador no soporta Geolocalizacion.');
}
  $(document).ready(function(){
    initMap();    
  });
})();



