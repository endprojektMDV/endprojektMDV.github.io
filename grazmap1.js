
let myMap1 = L.map("map1", {
    // fullscreenControl: true
}) 


const aswGroup = L.featureGroup();
let OverlaySteigung = L.featureGroup().addTo(myMap1)

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
    
    
},{
   
},
{collapsed:false  
}
);



myMap1.addControl (myMapControl1); 


myMap1.setView([47.267,11.383], 11); 

L.control.scale( 
{imperial: false, 
maxWidth:200 
}
).addTo(myMap1); 




let gpxTrack = new L.GPX("graz/grazFreizeit/asw.gpx", { // https://github.com/mpetazzoni/leaflet-gpx
    async : true,
}).addTo(aswGroup);
gpxTrack.on("loaded", function(evt) {
    console.log(evt.target.get_distance().toFixed(0))
    console.log(evt.target.get_elevation_min().toFixed(0))
    console.log(evt.target.get_elevation_max().toFixed(0))
    console.log(evt.target.get_elevation_gain().toFixed(0))
    console.log(evt.target.get_elevation_loss().toFixed(0))

    let laenge = evt.target.get_distance().toFixed(0);
    document.getElementById("laenge").innerHTML = laenge

    let min = evt.target.get_elevation_min().toFixed(0);
    document.getElementById("min").innerHTML = min

    let max = evt.target.get_elevation_max().toFixed(0);
    document.getElementById("max").innerHTML = max

    let hinauf = evt.target.get_elevation_gain().toFixed(0);
    document.getElementById("hinauf").innerHTML = hinauf

    let hinab = evt.target.get_elevation_loss().toFixed(0);
    document.getElementById("hinab").innerHTML = hinab

    myMap1.fitBounds(evt.target.getBounds());
});


gpxTrack.on('addline', function(evt){
    hoehenProfil.addData(evt.line);
    console.log(evt.line)
    console.log(evt.line.getLatLngs)
    console.log(evt.line.getLatLngs()[0])
    console.log(evt.line.getLatLngs()[0].lat)
    console.log(evt.line.getLatLngs()[0].lng)
    console.log(evt.line.getLatLngs()[0].meta)
    console.log(evt.line.getLatLngs()[0].meta.ele)

    // alle Segmente der Steigungslinie hinzufügen
    let gpxLinie = evt.line.getLatLngs();
    for (let i = 1; i < gpxLinie.length; i++) {
        let p1 = gpxLinie[i-1];
        let p2 = gpxLinie[i];
        // console.log(p1.lat,p1.lng,p2.lat,p2.lng);
    
    // Entfernung zwischen den Punkten berechnen
    let dist = myMap1.distance(
        [p1.lat,p1.lng],
        [p2.lat,p2.lng]
    );
    // console.log(p1.lat,p1.lng,p2.lat,p2.lng,dist)

    // Höhenunterschied berechnen
    let delta = p2.meta.ele - p1.meta.ele;
    // console.log(p1.lat,p1.lng,p2.lat,p2.lng,dist,delta)

    // Steigung in % berechnen
    /* let proz = 0;
    if (dist > 0) {
        proz = (delta / dist * 100.0).toFixed(1);
    } ODER SO: */
    let proz = (dist > 0) ? (delta / dist * 100.0).toFixed(1) : 0;
    // Bedingung ? Ausdruck1 : (: steht für sonst) Ausdruck2
    console.log(p1.lat,p1.lng,p2.lat,p2.lng,dist,delta,proz)

    // verschiedene Farben für Steigung bzw Abstieg
    let farbe = 
        proz > 10  ? "#cb181d" : 
        proz > 6   ? "#fb6a4a" : 
        proz > 2   ? "#fcae91" : 
        proz > 0   ? "#fee5d9" : 
        proz > -2  ? "#edf8e9" : 
        proz > -6  ? "#bae4b3" : 
        proz > -10 ? "#74c476" : 
                     "#238b45";

     // Farbauswahl: http://colorbrewer2.org/#type=sequential&scheme=BuGn&n=3

    let segment = L.polyline(
        [
            [p1.lat,p1.lng],
            [p2.lat,p2.lng],
        ], {
                color: farbe,
                weight : 10,
            }
        ).addTo(OverlaySteigung);
    }
});

myMap1.fitBounds(aswGroup.getBounds());