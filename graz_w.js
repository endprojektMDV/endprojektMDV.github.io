
let myMap1 = L.map("map1", {
    fullscreenControl: true
}) 


const aswGroup = L.featureGroup();


myLayers1 = {    
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

myMap1.addLayer(myLayers1.geolandbasemap); 

let myMapControl1 = L.control.layers({  
    "Openstreetmap" : myLayers1.osm,
    "Basemap.at" : myLayers1.geolandbasemap, 
    
},{"Wanderweg" :  aswGroup,

},
{ // collapsed:false  
}
);


myMap1.addControl (myMapControl1); 


myMap1.setView([47.267,11.383], 11); 

L.control.scale( 
{imperial: false, 
maxWidth:200 
}
).addTo(myMap1); 

let el = L.control.elevation({
    position: "bottomright",
    collapsed: true
}).addTo(myMap1);


let gpxTrack = new L.GPX("daten/graz_asw.gpx", { 
    async : true,
}).addTo(aswGroup);
gpxTrack.on("loaded", function(evt) {
myMap1.fitBounds(evt.target.getBounds())


});

gpxTrack.on("addline",function(evt){
    el.addData(evt.line);
});
aswGroup.addTo(myMap1)