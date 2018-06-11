
let myMap = L.map("map", {
    fullscreenControl: true
}) 
let markerGroup = L.featureGroup();

myLayers = {    
    osm : L.tileLayer ( 
        "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
	{ 
        attribution : "Datenquelle: <a href='https://www.openstreetmap.org' >Openstreepmap.com</a>"
    }	
    ),
    
    geolandbasemap : L.tileLayer (
        "https://{s}.wien.gv.at/basemap/geolandbasemap/normal/google3857/{z}/{y}/{x}.png", 
        { subdomains : ["maps","maps1","maps2","maps3","maps4"],                        
        attribution : "Datenquelle: <a href='https://www.basemap.at' >Basemap.at</a>"   
    }
    )

}; 

myMap.addLayer(myLayers.geolandbasemap); 

let myMapControl = L.control.layers({  
    "Openstreetmap" : myLayers.osm,
    "Basemap.at" : myLayers.geolandbasemap  
},{

},
{collapsed:false  
}
);

myMap.addControl(myMapControl); 

myMap.setView([47.267,11.383], 11); 

L.control.scale( 
{imperial: false, 
maxWidth:200 
}

).addTo(myMap); 

const innsbruck = [47.275185,11.399388];
const salzburg = [47.799922,13.040980];
const graz = [47.066787,15.434579];

const cityicon = L.icon ({
    iconUrl: 'images/cityicon.png',
    iconAnchor: [15, 35],
    popupAnchor: [1,-30],
})

myMap.addLayer(markerGroup);

let innsbruckMarker = L.marker (innsbruck, {icon: cityicon}, {title: "Innsbruck"}).addTo(markerGroup)
innsbruckMarker.bindPopup('<img src="images/ibk_logo.jpg" alt="Innsbruck Logo"><center> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a href = "innsbruck.html">Zur Seite</a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</center>');

let salzburgMarker = L.marker (salzburg, {icon: cityicon}, {title: "Salzburg"}).addTo(markerGroup)
salzburgMarker.bindPopup('<img src="images/sbg_logo.png" alt="Salzburg Logo"><center>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a href = "salzburg.html">Zur Seite</a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</center>');

let grazMarker = L.marker (graz, {icon: cityicon}, {title: "Graz"}).addTo(markerGroup)
grazMarker.bindPopup('<img src="images/graz_logo.jpg" alt="Innsbruck Logo"><center>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a href = "graz.html">Zur Seite</a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</center>');

myMap.fitBounds(markerGroup.getBounds());