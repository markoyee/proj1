$(document).ready(function () {
    //wczytywanie mapy

    
    //dane z OSM
    var lyrOSM = L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png');
     
    //warstwa z ortofotomapy geoportal
    var lyrORTO = L.tileLayer.wms("http://mapy.geoportal.gov.pl/wss/service/img/guest/ORTO/MapServer/WMSServer", {layers: "Raster", format: 'image/png', transparent : 'true', version : '1.1.1'});
    
    //tworzenie mapy
    var mymap = L.map('mymap', {center: [52.1, 21.0], zoom: 10, zoomControl: false, attributionControl: false, layers:[lyrOSM,lyrORTO]});
    
    mymap.addLayer(lyrOSM);
    
    
    var baseMaps = {
        "Openstreetmap": lyrOSM,
        "Ortofotomapa": lyrORTO          
      };
    
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

