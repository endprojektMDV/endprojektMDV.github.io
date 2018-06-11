
let myMap = L.map("map", {
    fullscreenControl: true
}) 

const ausgehenGroup = L.featureGroup();
const heimeGroup = L.featureGroup();
const sportGroup = L.featureGroup();
const uniGroup = L.featureGroup();

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
   "Studentenheime" :  heimeGroup,
   "Bars & Ausgehmöglichkeiten" :  ausgehenGroup,
   "Unistandorte" :  uniGroup,
},
{ collapsed:false  
}
);



myMap.addControl (myMapControl); 


myMap.setView([47.267,11.383], 11); 

L.control.scale( 
{imperial: false, 
maxWidth:200 
}
).addTo(myMap); 

const ausgehenicon = L.icon ({
    iconUrl: 'images/lokale_icon.png',
    iconAnchor: [15, 35],
    popupAnchor: [1,-30],
})

for(const entry of salzburgAusgehen) {
    const latlng = [entry.lat, entry.lng]
    L.marker(latlng, {icon: ausgehenicon}).addTo(ausgehenGroup).bindPopup(`<h3>${entry.name}</h3>`)
}

const heimeicon = L.icon ({
    iconUrl: 'images/heime_icon.png',
    iconAnchor: [15, 35],
    popupAnchor: [1,-30],
})

for(const entry of salzburgWohnheime) {
    const latlng = [entry.lat, entry.lng]
    L.marker(latlng, {icon: heimeicon}).addTo(heimeGroup).bindPopup(`<h3>${entry.name}</h3>`)
}

const uniicon = L.icon ({
    iconUrl: 'images/uni_icon.png',
    iconAnchor: [15, 35],
    popupAnchor: [1,-30],
})

for(const entry of salzburgUni) {
    const latlng = [entry.lat, entry.lng]
    L.marker(latlng, {icon: uniicon}).addTo(uniGroup).bindPopup(`<h3>${entry.name}</h3>`)
}

myMap.fitBounds(uniGroup.getBounds())

