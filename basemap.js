
let myMap2 = L.map("mapdiv2"); // http://leafletjs.com/reference-1.3.0.html#map-l-map
myLayers2 = {    
    osm : L.tileLayer ( // http://leafletjs.com/reference-1.3.0.html#tilelayer-l-tilelayer
        "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
	{ 
        attribution : "Datenquelle: <a href='https://www.openstreetmap.org' >Openstreepmap.com</a>"
    }	
    ),
    
    geolandbasemap : L.tileLayer (
        "https://{s}.wien.gv.at/basemap/geolandbasemap/normal/google3857/{z}/{y}/{x}.png", 
        { subdomains : ["maps","maps1","maps2","maps3","maps4"],                        // http://leafletjs.com/reference-1.3.0.html#tilelayer-subdomains
        attribution : "Datenquelle: <a href='https://www.basemap.at' >Basemap.at</a>"   // http://leafletjs.com/reference-1.3.0.html#layer-attribution
    }
    ),

    bmapgrau: L.tileLayer (
        "https://{s}.wien.gv.at/basemap/bmapgrau/normal/google3857/{z}/{y}/{x}.png",
        { subdomains : ["maps","maps1","maps2","maps3","maps4"], 
        attribution : "Datenquelle: <a href='https://www.basemap.at' >Basemap.at</a>"
    }
    ),
    bmaporthofoto30cm:  L.tileLayer (
        "https://{s}.wien.gv.at/basemap/bmaporthofoto30cm/normal/google3857/{z}/{y}/{x}.jpeg",
        { subdomains : ["maps","maps1","maps2","maps3","maps4"], 
        attribution : "Datenquelle: <a href='https://www.basemap.at' >Basemap.at</a>"
    }
    ),
    bmapoverlay: L.tileLayer (
        "https://{s}.wien.gv.at/basemap/bmapoverlay/normal/google3857/{z}/{y}/{x}.png",
        { subdomains : ["maps","maps1","maps2","maps3","maps4"], 
        attribution : "Datenquelle: <a href='https://www.basemap.at' >Basemap.at</a>"
    }
    ),
    bmaphidpi: L.tileLayer (
        "https://{s}.wien.gv.at/basemap/bmaphidpi/normal/google3857/{z}/{y}/{x}.jpeg",
        { subdomains : ["maps","maps1","maps2","maps3","maps4"], 
        attribution : "Datenquelle: <a href='https://www.basemap.at' >Basemap.at</a>"
    }
    )

}; 

myMap2.addLayer(myLayers2.geolandbasemap); // http://leafletjs.com/reference-1.3.0.html#map-addlayer

let myMapControl2 = L.control.layers({  // http://leafletjs.com/reference-1.3.0.html#control-layers-l-control-layers
    "Openstreetmap" : myLayers2.osm,
    "Basemap.at" : myLayers2.geolandbasemap,
    "Basemap.at (Grau)" : myLayers2.bmapgrau,
	"Basemap.at (highdpi)" : myLayers2.bmaphidpi,
    "Orthophoto 30cm" : myLayers2.bmaporthofoto30cm,    
    
},{"Basemap overlay" : myLayers2.bmapoverlay,
},
{collapsed:false  // http://leafletjs.com/reference-1.3.0.html#control-layers-collapsed
}
);



myMap2.addControl (myMapControl2); // http://leafletjs.com/reference-1.3.0.html#map-addcontrol


myMap2.setView([47.267,11.383], 11); // http://leafletjs.com/reference-1.3.0.html#map-setview

L.control.scale( // http://leafletjs.com/reference-1.3.0.html#control-scale-l-control-scale
{imperial: false, // http://leafletjs.com/reference-1.3.0.html#control-scale-imperial
maxWidth:200 // http://leafletjs.com/reference-1.3.0.html#control-scale-maxwidth
}
// metrische Angaben anzeigen sowie Position unten links ensprechen den defaults
).addTo(myMap2); 
