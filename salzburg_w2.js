
let myMap2 = L.map("map2", {
    fullscreenControl: true
}) 


const aswGroup2 = L.featureGroup();


myLayers2 = {    
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

myMap2.addLayer(myLayers2.geolandbasemap); 

let myMapControl2 = L.control.layers({  
    "Openstreetmap" : myLayers2.osm,
    "Basemap.at" : myLayers2.geolandbasemap, 
    
},{"Wanderweg" :  aswGroup2,

},
{ // collapsed:false  
}
);


myMap2.addControl (myMapControl2); 


myMap2.setView([47.267,11.383], 11); 

L.control.scale( 
{imperial: false, 
maxWidth:200 
}
).addTo(myMap2); 

let el2 = L.control.elevation({
    position: "bottomright",
    collapsed: true
}).addTo(myMap2);


let gpxTrack2 = new L.GPX("daten/sbg_mozart.gpx", { 
    async : true,
}).addTo(aswGroup2);
gpxTrack2.on("loaded", function(evt) {
myMap2.fitBounds(evt.target.getBounds())


});

gpxTrack2.on("addline",function(evt){
    el2.addData(evt.line);
});
aswGroup2.addTo(myMap2)