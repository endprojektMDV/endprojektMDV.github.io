
let myMap = L.map("mapdiv", {
    fullscreenControl: true
}) 



const heime = L.featureGroup();
const lokale = L.featureGroup();
const uni = L.featureGroup();
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
    "Basemap.at" : myLayers.geolandbasemap,
    
    
},{
   "Studentenheime" :  heime,
   "Studentenlokale" :  lokale,
   "Unistandorte" :  uni
},
{collapsed:false  
}
);



myMap.addControl (myMapControl); 


myMap.setView([47.267,11.383], 11); 

L.control.scale( 
{imperial: false, 
maxWidth:200 
}

).addTo(myMap); 


L.geoJSON(studentenheime, {

        pointToLayer: function(geoJsonPoint, latlng){
            return L.marker(latlng, {
           icon: L.icon({
                iconUrl: "images/heime_icon.png",
                iconAnchor: [15, 35],
                popupAnchor: [1, -30]
            })
       });
   }
}).addTo(heime).bindPopup(function(layer) {
       
        const props = layer.feature.properties
        const popupText = `<h3>${props.Name}</h3>`;
        return popupText;
        });



L.geoJSON(studentenlokale, {

    pointToLayer: function(geoJsonPoint, latlng){
        return L.marker(latlng, {
       icon: L.icon({
            iconUrl: "images/lokale_icon.png",
            iconAnchor: [15, 35],
            popupAnchor: [1, -30]
        })
   });
}
}).addTo(lokale).bindPopup(function(layer) {
       
    const props = layer.feature.properties
        const popupText = `<h3>${props.name}</h3>`;
        return popupText;
        });



L.geoJSON(unistandorte, {

    pointToLayer: function(geoJsonPoint, latlng){
        return L.marker(latlng, {
       icon: L.icon({
            iconUrl: "images/uni_icon.png",
            iconAnchor: [15, 35],
            popupAnchor: [1, -30]
        })
   });
} 
}).addTo(uni).bindPopup(function(layer) {
       
        const props = layer.feature.properties
        const popupText = `<h3>${props.Bezeichnung}</h3> `;
        return popupText;
        });