function track()
{
 this.trackpoints = new Array();
}

// Trackpoint LAT & LONG in DEGREES
t1 = {lat:51.1329624, lon:4.391393, timestamp: 0}
t2 = {lat:51.1337225, lon:4.3896425, timestamp: 5}
t3 = {lat:3, lon:3, timestamp: 6}


function addTP(track_obj,trackpoint)
{
 track_obj.trackpoints.push(trackpoint);
}

function distance_meters(tp1,tp2){
    lat1 = tp1.lat
    lat2 = tp2.lat
    lon1 = tp1.lon
    lon2 = tp2.lon
    var R = 6371; // km (radius of earth)
    var dLat = deg2rad(lat2-lat1)
    var dLon = deg2rad(lon2-lon1)
    var lat1 = deg2rad(lat1);
    var lat2 = deg2rad(lat2);

    var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
        Math.sin(dLon/2) * Math.sin(dLon/2) * Math.cos(lat1) * Math.cos(lat2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    var d = R * c;
    return( d*1000)
}

function timediff(tp1,tp2){
    return tp2.timestamp -tp1.timestamp
}


function velocity(tp1,tp2){
    dist = distance_meters(tp1,tp2);
    dt = timediff(tp1,tp2)
    if (dt===0)
        return 0;

    return dist/dt;
}

function maxvelocity(track_obj){
    maxvel = 0;
    for(i=1;i<track_obj.trackpoints.length;i++){
        tp1 = track_obj.trackpoints[i-1];
        tp2 = track_obj.trackpoints[i];
        vel = velocity(tp1,tp2)
        if (vel > maxvel){
            maxvel = vel
        }
    }

    return maxvel;
}


function velocities(track_obj){
    maxvel = 0;
    for(i=1;i<track_obj.trackpoints.length;i++){
        tp1 = track_obj.trackpoints[i-1];
        tp2 = track_obj.trackpoints[i];
        vel = velocity(tp1,tp2)
        if (vel > maxvel){
            maxvel = vel
        }
    }

    return maxvel;
}



function totaldistance_meters(track_obj){
    dist = 0;
    for(i=1;i<track_obj.trackpoints.length;i++){
        tp1 = track_obj.trackpoints[i-1];
        tp2 = track_obj.trackpoints[i];
        dist += distance_meters(tp1,tp2)
    }
    return dist;
}


function deg2rad(deg) {
  return deg * (Math.PI/180)
}
