
let myMap = L.map("mapdiv", {
    fullscreenControl: true
}) 

const heime = L.featureGroup();
const lokale = L.featureGroup();
const uni = L.featureGroup();

const sport = L.markerClusterGroup();

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
   "Bars & Ausgehmöglichkeiten" :  lokale,
   "Unistandorte" :  uni,
   "Sportanlagen" : sport
},
{collapsed:false  
}
);

myMap.addControl (myMapControl); 



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
        const popupText = `<h3>${props.name}</h3><img src="${props.bild}"  height="140" width="200"> `;
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
        const popupText = `<h3>${props.Bezeichnung}</h3><a target="_blank" href="${props.Link}">Link</a> `;
        return popupText;
        });


let geoJsonLayer = L.geoJSON(sportanlagen,  {
    onEachFeature: function (feature, layer) {
        layer.bindPopup(function(layer) {
       
            const props = layer.feature.properties
            const popupText = `<h3>${props.Typ}</h3><p3>${props.Anlage}</p> `;
            return popupText;
            });
    },
    pointToLayer: function(geoJsonPoint, latlng){
        return L.marker(latlng, {
       icon: L.icon({
            iconUrl: "images/sport_icon.png",
            iconAnchor: [15, 35],
            popupAnchor: [1, -30]
        })
   });
} 
});

sport.addLayer(geoJsonLayer);

myMap.fitBounds(heime.getBounds())
