$(document).ready(function () {
    //wczytywanie mapy
    var mymap = L.map('mymap', {center: [52.1, 21.0], zoom: 10, zoomControl: false, attributionControl: false});
    var lyrOSM = L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png');
    mymap.addLayer(lyrOSM);

    
    
    //tworze zmienna w postacie mojej ikonki.
    var myicon=L.icon({
        iconUrl: 'img/platoon.png',
        iconSize: [50, 50],
        iconAnchor: [25,25],
        popupAnchor: [0, 0],

    });
    
    
    
    //okodowanie ppm
    mymap.on('contextmenu', function (e) {
       
        L.marker(e.latlng, {icon: myicon}).addTo(mymap).bindPopup('wspolrzedne: <br>' + e.latlng);
        
        // ppm automatycznie wpisuje wartość do diva po prawej stornie
       // var wspt = e.latlng.toString;
        var szer = e.latlng.lat.toFixed(2);
        var dl = e.latlng.lng.toFixed(2);
        
        $("#tekst").html('<br> [szer], [dl]');
        $("#tekst").append('<br> [' + szer + '], [' + dl + ']');
      
        //wysłanie zmiennej do php
        $.ajax({
            url: "connect.php",
            type: 'POST',
            data: { szer: szer, dl: dl },
            success: function(msg){
            console.log('Server response :\n '+msg);
            },
            error: function (ajaxContext){
            console.log(ajaxContext.responseText);
            }
        });
        
    }); // koniec ppm
});

