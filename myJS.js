$(document).ready(function () {
    //wczytywanie mapy

    //deklaracja map podkładowych
    var lyrOSM = L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png'),
        lyrORTO = L.tileLayer.wms("http://mapy.geoportal.gov.pl/wss/service/img/guest/ORTO/MapServer/WMSServer", {layers: "Raster", format: 'image/png', transparent : 'true', version : '1.1.1'}),    
        lyrSozo = L.tileLayer.wms("http://mapy.geoportal.gov.pl/wss/service/img/guest/SOZO/MapServer/WMSServer", {layers: "Raster", format: 'image/png', transparent : 'true', version : '1.1.1'}),
        // przypisuję do zmiennej mymap obiekt mapa z klasy map
        mymap = L.map('mymap', {center: [52.1, 21.0], zoom: 10, zoomControl: false, attributionControl: false});

    mymap.addLayer(lyrOSM);
        
    var baseMaps = {
        "Openstreetmap": lyrOSM,
        "Ortofotomapa": lyrORTO,
        "Mapa Sozologiczna": lyrSozo
      };
    
    //polecenie dodania ikonki 
    L.control.layers(baseMaps).addTo(mymap);
    
    //Działa ale zamula w chuj bo geoportal jest mało wydajny

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
        
        // okodowanie zeby ppm automatycznie wpisywal wspolrzedne markera do diva po prawej stornie
        var szer = e.latlng.lat.toFixed(2);
        var dl = e.latlng.lng.toFixed(2);
        
        $("#tekst").html('<br> [szer], [dl]');
        $("#tekst").append('<br> [' + szer + '], [' + dl + ']');
      
        //wysłanie zmiennej do php za pomocą uproszczonego ajax z biblioteki jquery 
        $.ajax({
            url: "connect.php",
            type: 'POST', //deklaracja sposobu przekazywania zmiennych 
            data: { szer: szer, dl: dl }, //opis argumentów do przekazania musi być zgodny z json
            success: function(msg){
            console.log('Server response :\n '+msg); //argument funkcji to odpowiedz serwera i docelowo ma isc do console log żeby odczytać komunikat
            },
            error: function (ajaxContext){
            console.log(ajaxContext.responseText); //odpowiedz ma isc do console log 
            }
        });
    }); // koniec ppm
});